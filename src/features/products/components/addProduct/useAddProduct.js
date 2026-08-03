import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../../../../routes/services/productService";

export const useAddProduct = () => {
  const navigate = useNavigate();

  /* ============================
      FORM STATE
  ============================ */

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    brand: "",
    supplier: "",
    costPrice: "",
    sellingPrice: "",
    stock: "",
    unit: "",
    reorderLevel: "",
    batch: "", 
    manufacturingDate: "",
    expiryDate: "",
    description: "",
  });

  /* ============================
      API DATA
  ============================ */

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [loadingMetadata, setLoadingMetadata] = useState(true);

  /* ============================
      SUBMISSION
  ============================ */

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /* ============================
      LOAD CATEGORIES & UNITS
  ============================ */

  useEffect(() => {
    let isMounted = true;

    const fetchMetadata = async () => {
      try {
        setLoadingMetadata(true);
        setError(null);

        const [categoriesData, unitsData] = await Promise.all([
          productService.getCategories(),
          productService.getUnits(),
        ]);

        if (isMounted) {
          console.log("========== CATEGORIES ==========");
          console.log(categoriesData);

          console.log("========== UNITS ==========");
          console.log(unitsData);

          setCategories(categoriesData || []);
          setUnits(unitsData || []);
        }
      } catch (err) {
        console.error("Failed to load metadata", err);

        if (isMounted) {
          setError("Failed to load categories or units.");
        }
      } finally {
        if (isMounted) {
          setLoadingMetadata(false);
        }
      }
    };

    fetchMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ============================
      HANDLE INPUT CHANGE
  ============================ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("========== FIELD CHANGED ==========");
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ============================
      PREPARE PAYLOAD
  ============================ */

  const preparePayload = () => {
    const payload = {
      name: formData.name,
      sku: formData.sku,
      categoryId: formData.category,
      unitId: formData.unit,
      costPrice: Number(formData.costPrice) || 0,
      sellingPrice: Number(formData.sellingPrice) || 0,
      stock: Number(formData.stock) || 0,
      reorderLevel: Number(formData.reorderLevel) || 0,
    };

    return payload;
  };

  /* ============================
      SAVE PRODUCT
  ============================ */

  const handleSave = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log("========== CURRENT FORM DATA ==========");
      console.log(formData);

      const payload = preparePayload();

      console.log("========== PAYLOAD ==========");
      console.log(payload);

      console.log("Category ID:", payload.categoryId);
      console.log("Unit ID:", payload.unitId);

      const response = await productService.createProduct(payload);

      console.log("========== SUCCESS ==========");
      console.log(response);

      alert("Product created successfully!");

      navigate("/inventory/products");
    } catch (err) {
      console.error("========== ERROR ==========");
      console.error(err);

      console.log("========== BACKEND RESPONSE ==========");
      console.log(err.response?.data);

      setError(err.response?.data?.message || err.message);

      alert(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================
      SAVE & ADD ANOTHER
  ============================ */

  const handleSaveAndAddAnother = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log("========== CURRENT FORM DATA ==========");
      console.log(formData);

      const payload = preparePayload();

      console.log("========== PAYLOAD ==========");
      console.log(payload);

      const response = await productService.createProduct(payload);

      console.log("========== SUCCESS ==========");
      console.log(response);

      alert("Product created successfully!");

      setFormData({
        name: "",
        sku: "",
        category: "",
        brand: "",
        supplier: "",
        costPrice: "",
        sellingPrice: "",
        stock: "",
        unit: "",
        reorderLevel: "",
        batch: "",
        manufacturingDate: "",
        expiryDate: "",
        description: "",
      });
    } catch (err) {
      console.error(err);

      console.log(err.response?.data);

      setError(err.response?.data?.message || err.message);

      alert(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ============================
      CANCEL
  ============================ */

  const handleCancel = () => {
    navigate("/inventory/products");
  };

  return {
    formData,
    handleChange,
    handleSave,
    handleSaveAndAddAnother,
    handleCancel,
    categories,
    units,
    loadingMetadata,
    isSubmitting,
    error,
  };
};