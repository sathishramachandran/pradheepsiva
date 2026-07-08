import { useState } from "react";
import axios from "axios";

function AddCustomer() {

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [form, setForm] =
    useState({

      customerName: "",

      mobileNumber: "",

      mobileBrand: "",

      mobileModel: "",

      issue: "",

      amount: "",

      advance: ""

    });

  const [errors, setErrors] =
    useState({

      customerName: "",

      mobileNumber: "",

      mobileBrand: "",

      mobileModel: "",

      issue: "",

      amount: "",

      advance: ""

    });

  /* =========================
      HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({

      ...form,

      [name]: value

    });

    setErrors({

      ...errors,

      [name]: ""

    });

  };

  /* =========================
      VALIDATION
  ========================= */

  const validateForm = () => {

    let newErrors = {};

    if (!form.customerName.trim()) {

      newErrors.customerName =
        "Customer Name is required";

    }

    else if (form.customerName.length < 3) {

      newErrors.customerName =
        "Minimum 3 characters";

    }

    if (!form.mobileNumber) {

      newErrors.mobileNumber =
        "Mobile Number is required";

    }

    else if (!/^[6-9]\d{9}$/.test(form.mobileNumber)) {

      newErrors.mobileNumber =
        "Enter valid 10 digit number";

    }

    if (!form.mobileBrand.trim()) {

      newErrors.mobileBrand =
        "Select Mobile Brand";

    }

    if (!form.mobileModel.trim()) {

      newErrors.mobileModel =
        "Enter Mobile Model";

    }

    if (!form.issue.trim()) {

      newErrors.issue =
        "Issue is required";

    }

    if (!form.amount) {

      newErrors.amount =
        "Repair Amount is required";

    }

    else if (Number(form.amount) <= 0) {

      newErrors.amount =
        "Invalid Amount";

    }

    if (!form.advance) {

      newErrors.advance =
        "Advance Amount is required";

    }

    else if (
      Number(form.advance) >
      Number(form.amount)
    ) {

      newErrors.advance =
        "Advance cannot exceed Amount";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  /* =========================
      SUBMIT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {

      await axios.post(

        "https://pradheepsiva.onrender.com/api/mobile/add",

        form

      );

      setSuccess(
        "Customer Added Successfully"
      );

      setForm({

        customerName: "",

        mobileNumber: "",

        mobileBrand: "",

        mobileModel: "",

        issue: "",

        amount: "",

        advance: ""

      });

      setErrors({});

    }

    catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

    finally {

      setLoading(false);

    }

  };
    return (

    <section className="customer-form-page">

      <div className="customer-form-container">

        <h2 className="form-title">

          👤 Customer Entry

        </h2>

        <p className="form-subtitle">

          Add Customer & Mobile Repair Details

        </p>

        {

          success && (

            <div className="success-card">

              {success}

            </div>

          )

        }

        <form

          className="customer-form"

          onSubmit={handleSubmit}

        >

          {/* ROW 1 */}

          <div className="form-row">

            <div className="form-group">

              <label>

                👤 Customer Name

              </label>

              <input

                type="text"

                name="customerName"

                placeholder="Enter Customer Name"

                value={form.customerName}

                onChange={handleChange}

              />

              {

                errors.customerName &&

                <small className="error">

                  {errors.customerName}

                </small>

              }

            </div>

            <div className="form-group">

              <label>

                📱 Mobile Number

              </label>

              <input

                type="text"

                maxLength="10"

                name="mobileNumber"

                placeholder="Enter Mobile Number"

                value={form.mobileNumber}

                onChange={handleChange}

              />

              {

                errors.mobileNumber &&

                <small className="error">

                  {errors.mobileNumber}

                </small>

              }

            </div>

          </div>

          {/* ROW 2 */}

          <div className="form-row">

            <div className="form-group">

              <label>

                📱 Mobile Brand

              </label>

              <input

                type="text"

                name="mobileBrand"

                placeholder="Samsung / Vivo / Redmi"

                value={form.mobileBrand}

                onChange={handleChange}

              />

              {

                errors.mobileBrand &&

                <small className="error">

                  {errors.mobileBrand}

                </small>

              }

            </div>

            <div className="form-group">

              <label>

                📲 Mobile Model

              </label>

              <input

                type="text"

                name="mobileModel"

                placeholder="Enter Mobile Model"

                value={form.mobileModel}

                onChange={handleChange}

              />

              {

                errors.mobileModel &&

                <small className="error">

                  {errors.mobileModel}

                </small>

              }

            </div>

          </div>

          {/* ISSUE */}

          <div className="form-group">

            <label>

              🔧 Mobile Issue

            </label>

            <textarea

              rows="4"

              name="issue"

              placeholder="Describe the issue"

              value={form.issue}

              onChange={handleChange}

            />

            {

              errors.issue &&

              <small className="error">

                {errors.issue}

              </small>

            }

          </div>

          {/* ROW 3 */}

          <div className="form-row">

            <div className="form-group">

              <label>

                💰 Repair Amount

              </label>

              <input

                type="number"

                name="amount"

                placeholder="Enter Amount"

                value={form.amount}

                onChange={handleChange}

              />

              {

                errors.amount &&

                <small className="error">

                  {errors.amount}

                </small>

              }

            </div>

            <div className="form-group">

              <label>

                💵 Advance Amount

              </label>

              <input

                type="number"

                name="advance"

                placeholder="Advance Amount"

                value={form.advance}

                onChange={handleChange}

              />

              {

                errors.advance &&

                <small className="error">

                  {errors.advance}

                </small>

              }

            </div>

          </div>

          <button

            type="submit"

            className="save-btn"

            disabled={loading}

          >

            {

              loading

                ? "Saving..."

                : "➕ Save Customer"

            }

          </button>

        </form>

      </div>

    </section>

  );

}

export default AddCustomer;