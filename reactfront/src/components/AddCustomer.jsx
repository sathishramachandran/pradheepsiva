import React, { useState } from "react";
import axios from "axios";

function AddCustomer() {
  const [form, setForm] = useState({
    customerName: "",
    mobileNumber: "",
    mobileBrand: "",
    mobileModel: "",
    issue: "",
    amount: "",
    advance: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Customer Name
    if (!form.customerName.trim()) {
      newErrors.customerName = "Customer Name is required";
    }

    // Mobile Number
    if (!form.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit Mobile Number";
    }

    // Mobile Brand
    if (!form.mobileBrand.trim()) {
      newErrors.mobileBrand = "Mobile Brand is required";
    }

    // Mobile Model
    if (!form.mobileModel.trim()) {
      newErrors.mobileModel = "Mobile Model is required";
    }

    // Issue
    if (!form.issue.trim()) {
      newErrors.issue = "Issue is required";
    }

    // Repair Amount
    if (!form.amount) {
      newErrors.amount = "Repair Amount is required";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    // Advance Amount
    if (!form.advance) {
      newErrors.advance = "Advance Amount is required";
    } else if (Number(form.advance) > Number(form.amount)) {
      newErrors.advance =
        "Advance Amount cannot be greater than Repair Amount";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post(
        "https://pradheepsiva.onrender.com/api/mobile/add",
        form
      );

      alert("Customer Added Successfully");

      setForm({
        customerName: "",
        mobileNumber: "",
        mobileBrand: "",
        mobileModel: "",
        issue: "",
        amount: "",
        advance: "",
      });

      setErrors({});
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="mobile-form-page">
    <div className="mobile-form-container">
      <h2>Customer Entry</h2>

      {/* Customer Name */}
      <input
        className="mobile-form"
        placeholder="Customer Name"
        value={form.customerName}
        onChange={(e) =>
          setForm({ ...form, customerName: e.target.value })
        }
      />
      <small className="text-danger">{errors.customerName}</small>

      {/* Mobile Number */}
      <input
        className="mobile-form"
        placeholder="Mobile Number"
        value={form.mobileNumber}
        onChange={(e) =>
          setForm({ ...form, mobileNumber: e.target.value })
        }
      />
      <small className="text-danger">{errors.mobileNumber}</small>

      {/* Mobile Brand */}
      <input
        className="mobile-form"
        placeholder="Mobile Brand"
        value={form.mobileBrand}
        onChange={(e) =>
          setForm({ ...form, mobileBrand: e.target.value })
        }
      />
      <small className="text-danger">{errors.mobileBrand}</small>

      {/* Mobile Model */}
      <input
        className="mobile-form"
        placeholder="Mobile Model"
        value={form.mobileModel}
        onChange={(e) =>
          setForm({ ...form, mobileModel: e.target.value })
        }
      />
      <small className="text-danger">{errors.mobileModel}</small>

      {/* Issue */}
      <textarea
        className="mobile-form"
        placeholder="Issue"
        value={form.issue}
        onChange={(e) =>
          setForm({ ...form, issue: e.target.value })
        }
      />
      <small className="text-danger">{errors.issue}</small>

      {/* Repair Amount */}
      <input
        type="number"
        className="mobile-form"
        placeholder="Repair Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />
      <small className="text-danger">{errors.amount}</small>

      {/* Advance Amount */}
      <input
        type="number"
        className="mobile-form"
        placeholder="Advance Amount"
        value={form.advance}
        onChange={(e) =>
          setForm({ ...form, advance: e.target.value })
        }
      />
      <small className="text-danger">{errors.advance}</small>

      <button
        className="btn btn-primary mt-3"
        onClick={handleSubmit}
      >
        Save Customer
      </button>
    </div>
    </section>
  );
}

export default AddCustomer;