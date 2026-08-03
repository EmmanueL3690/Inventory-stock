import React, { useState, useEffect, useMemo, useCallback } from "react";
import purchaseService from "../services/purchaseService";

import SupplierSelector from "./SupplierSelect";
import PurchaseItemsTable from "./PurchaseItemsTable";
import PurchaseTotals from "./PurchaseTotals";
import PurchaseNotes from "./PurchaseNotes";
import PurchaseActions from "./PurchaseActions";

const createEmptyItem = () => ({
  id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  productId: "",
  quantity: 1,
  costPrice: 0,
  totalPrice: 0,
});

const INITIAL_STATE = {
  supplierId: "",
  paymentStatus: "pending",
  notes: "",
  items: [createEmptyItem()],
};

const PurchaseFormModal = ({
  isOpen = false,
  onClose,
  onSubmitSuccess,
  showToast,
  suppliers: suppliersProp = [],
  products: productsProp = [],
}) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [loadingData, setLoadingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [apiError, setApiError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const resetForm = useCallback(() => {
    setFormData({
      supplierId: "",
      paymentStatus: "pending",
      notes: "",
      items: [createEmptyItem()],
    });
    setApiError("");
    setValidationErrors({});
    setIsSubmitting(false);
  }, []);

  const loadModalData = useCallback(async () => {
    try {
      setLoadingData(true);
      setApiError("");

      const [suppliersRes, productsRes] = await Promise.all([
        purchaseService.getSuppliers(),
        purchaseService.getProducts(),
      ]);

      const extractedSuppliers = Array.isArray(suppliersRes)
        ? suppliersRes
        : suppliersRes?.data || [];
      const extractedProducts = Array.isArray(productsRes)
        ? productsRes
        : productsRes?.data || [];

      setSuppliers(extractedSuppliers);
      setProducts(extractedProducts);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to load suppliers and products.";
      setApiError(message);
    } fontFinally: {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }

    if (suppliersProp.length > 0 && productsProp.length > 0) {
      setSuppliers(suppliersProp);
      setProducts(productsProp);
    } else {
      loadModalData();
    }
  }, [isOpen, suppliersProp, productsProp, resetForm, loadModalData]);

  const itemsWithTotals = useMemo(() => {
    return formData.items.map((item) => {
      const qty = Number(item.quantity) || 0;
      const cost = Number(item.costPrice) || 0;
      return {
        ...item,
        totalPrice: qty * cost,
      };
    });
  }, [formData.items]);

  const grandTotal = useMemo(() => {
    return itemsWithTotals.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [itemsWithTotals]);

  const handleSupplierChange = useCallback((supplierId) => {
    setFormData((prev) => ({ ...prev, supplierId }));
    setValidationErrors((prev) => {
      if (!prev.supplierId) return prev;
      const { supplierId: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleItemsChange = useCallback((updatedItems) => {
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  }, []);

  const handleNotesChange = useCallback((notes) => {
    setFormData((prev) => ({ ...prev, notes }));
  }, []);

  const validate = useCallback(() => {
    const errors = {};

    if (!formData.supplierId) {
      errors.supplierId = "Please select a supplier.";
    }

    const validItems = formData.items.filter((item) => item.productId);

    if (validItems.length === 0) {
      errors.general = "Please select at least one product.";
    }

    formData.items.forEach((item, index) => {
      if (!item.productId) return;

      if (!item.quantity || Number(item.quantity) <= 0) {
        errors[`item_${index}_qty`] = "Quantity must be greater than zero.";
      }

      if (
        item.costPrice === "" ||
        item.costPrice === null ||
        isNaN(item.costPrice) ||
        Number(item.costPrice) < 0
      ) {
        errors[`item_${index}_cost`] = "Invalid cost price.";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData.supplierId, formData.items]);

  const parseApiError = useCallback((err) => {
    const status = err.response?.status;
    const backendData = err.response?.data;
    const backendMessage = backendData?.message || backendData?.error;

    if (backendData?.errors && typeof backendData.errors === "object") {
      setValidationErrors(backendData.errors);
    }

    switch (status) {
      case 401:
        return "Session expired. Please log in again.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "Purchase endpoint or resource not found (404).";
      case 422:
        return backendMessage || "Validation error. Please check your inputs.";
      case 500:
        return "Internal server error (500). Please try again later.";
      default:
        return backendMessage || err.message || "Failed to process purchase order.";
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      setApiError("");

      if (!validate()) return;

      setIsSubmitting(true);

      try {
        const itemsPayload = formData.items
          .filter((item) => item.productId)
          .map((item) => ({
            productId: item.productId,
            quantity: Number(item.quantity),
            costPrice: Number(item.costPrice),
          }));

        const payload = {
          supplierId: formData.supplierId,
          paymentStatus: formData.paymentStatus || "pending",
          notes: formData.notes || "",
          items: itemsPayload,
        };

        const response = await purchaseService.createPurchase(payload);

        if (showToast) {
          showToast("Purchase created successfully!");
        }

        if (onSubmitSuccess) {
          onSubmitSuccess(response);
        }

        resetForm();
        if (onClose) onClose();
      } catch (err) {
        console.error("Purchase creation error:", err);
        const errorMessage = parseApiError(err);
        setApiError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate, showToast, onSubmitSuccess, resetForm, onClose, parseApiError]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Create Purchase Order
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Record products purchased from suppliers.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center font-bold disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Modal Body / Form */}
        <form
          id="purchase-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* API Error Box */}
          {apiError && (
            <div className="rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
              {apiError}
            </div>
          )}

          {/* Validation Error Box */}
          {validationErrors.general && (
            <div className="rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-950/40 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 px-4 py-3 text-sm">
              {validationErrors.general}
            </div>
          )}

          {/* Supplier Selection */}
          <SupplierSelector
            suppliers={suppliers}
            value={formData.supplierId}
            loading={loadingData}
            error={validationErrors.supplierId}
            onChange={handleSupplierChange}
          />

          {/* Products & Dynamic Table */}
          <PurchaseItemsTable
            products={products}
            items={itemsWithTotals}
            onChange={handleItemsChange}
            errors={validationErrors}
          />

          {/* Bottom Section: Notes & Totals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PurchaseNotes
              notes={formData.notes}
              onChange={handleNotesChange}
            />

            <PurchaseTotals
              items={itemsWithTotals}
              grandTotal={grandTotal}
            />
          </div>
        </form>

        {/* Footer Actions */}
        <PurchaseActions
          onCancel={onClose}
          isSubmitting={isSubmitting}
          grandTotal={grandTotal}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default React.memo(PurchaseFormModal);