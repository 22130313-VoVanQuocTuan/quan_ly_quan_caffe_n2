import React, { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosHelp } from "react-icons/io";
import "./AddItem.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct, uploadImage } from "../service/foodApi";

// Thông số của các nguyên liệu
const initialIngredient = { code: "", name: "", quantity: "", unit: "" };

// form thêm món
const AddItem = () => {
    const [form, setForm] = useState({
        type: "drink",
        name: "",
        code: "",
        price: "",
        menuGroup: "",
        quantity: "",
        image: "",
        ingredients: [{ ...initialIngredient }],
    });

    const [image, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleRadioChange = (e) => {
        setForm({ ...form, type: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageClick = () => {
        document.getElementById("image-upload").click();
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const newIngredients = [...form.ingredients];
        newIngredients[index][name] = value;
        setForm({ ...form, ingredients: newIngredients });
    };

    const addIngredient = () => {
        setForm({ ...form, ingredients: [...form.ingredients, { ...initialIngredient }] });
    };

    const removeIngredient = (index) => {
        const newIngredients = form.ingredients.filter((_, i) => i !== index);
        setForm({ ...form, ingredients: newIngredients });
    };

    const removeImage = () => {
        setForm({ ...form, image: "" });
        setImagePreview(null);
    };

    // Gửi dữ liệu và hiện toast
    // 5.1.1.10 Khi thành công sẽ trả về message "Thêm món thành công!" 
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let imageUrl = form.image;

        // If an image file is selected, upload it to Cloudinary
        if (form.image instanceof File) {
            imageUrl = await uploadImage(form.image); // Get the Cloudinary URL
        }

        // Prepare payload for addProduct
        await addProduct({ ...form, image: imageUrl });

        toast.success("Thêm món thành công!");
        // Reset form or redirect as needed
        setForm({
            type: "drink",
            name: "",
            code: "",
            price: "",
            menuGroup: "",
            quantity: "",
            image: "",
            ingredients: [{ ...initialIngredient }],
        });
        setImagePreview(null);
    } catch (error) {
        console.error("Error adding product:", error);
        toast.error("Thêm món thất bại!");
    }
};


    // 
    return (
        <div className="additem-container">
            <div className="header-item">
                <h2 className="additem-title">Thêm món</h2>
            </div>
            <form className="additem-form" onSubmit={handleSubmit}>
                <div className="additem-form-left">
                    <div className="additem-row additem-row-1col">
                        <label className="additem-label additem-label-1col">Loại</label>
                        <div className="additem-radio-group">
                            <label className="additem-radio-label">
                                <input
                                    type="radio"
                                    name="type"
                                    value="drink"
                                    checked={form.type === "drink"}
                                    onChange={handleRadioChange}
                                />
                                Đồ uống
                            </label>
                        </div>
                    </div>

                    <div className="additem-row additem-row-3col">
                        <div>
                            <label className="additem-label">Mã món <span className="text-danger">(*)</span></label>
                            <input type="text" name="code" value={form.code} onChange={handleChange} required className="additem-input" />
                        </div>
                        <div>
                            <label className="additem-label">Tên món <span className="text-danger">(*)</span></label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required className="additem-input" />
                        </div>
                        <div>
                            <label className="additem-label">Giá bán <span className="text-danger">(*)</span></label>
                            <input type="text" name="price" value={form.price} onChange={handleChange} required className="additem-input" />
                        </div>
                    </div>

                    <div className="additem-row additem-row-2col">
                        <div>
                            <label className="additem-label">Nhóm thực đơn</label>
                            <div className="additem-select-group">
                                <select name="menuGroup" value={form.menuGroup} onChange={handleChange} className="additem-input" required>
                                    <option value="">Chọn Nhóm</option>
                                    <option value="Trà">Trà</option>
                                    <option value="Cà phê">Cà phê</option>
                                    <option value="Sinh tố">Sinh tố</option>
                                </select>
                                <button type="button" className="additem-btn-add btn button">+</button>
                            </div>
                        </div>
                        <div>
                            <label className="additem-label">Đơn vị tính <span className="text-danger">(*)</span></label>
                            <div className="additem-select-group">
                                <input type="text" name="quantity" value={form.quantity} onChange={handleChange} required className="additem-input" />
                                <button type="button" className="additem-btn-add btn button">+</button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="additem-row">
                        <label className="additem-label">Chế biến tại</label>
                        <div className="additem-select-group">
                            <select name="processAt" value={form.processAt} onChange={handleChange} className="additem-input">
                                <option value="">Chọn nơi chế biến</option>
                                <option value="Quầy bar">Quầy bar</option>
                                <option value="Bếp">Bếp</option>
                            </select>
                            <button type="button" className="additem-btn-add">+</button>
                        </div>
                    </div> */}

                    <div className="additem-ingredient-section">
                        <label className="additem-label">Định lượng nguyên vật liệu <span className="required">*</span></label>
                        <table className="additem-table">
                            <thead>
                                <tr>
                                    <th>Mã NVL</th>
                                    <th>Nguyên vật liệu</th>
                                    <th>Số lượng</th>
                                    <th>Đơn vị tính</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {form.ingredients.map((ing, idx) => (
                                    <tr key={idx}>
                                        <td><input type="text" name="code" value={ing.code} onChange={e => handleIngredientChange(idx, e)} className="additem-input" /></td>
                                        <td><input type="text" name="name" value={ing.name} onChange={e => handleIngredientChange(idx, e)} className="additem-input" /></td>
                                        <td><input type="number" name="quantity" value={ing.quantity} onChange={e => handleIngredientChange(idx, e)} className="additem-input" /></td>
                                        <td><input type="text" name="unit" value={ing.unit} onChange={e => handleIngredientChange(idx, e)} className="additem-input" /></td>
                                        <td>
                                            {form.ingredients.length > 1 && (
                                                <button type="button" className="additem-btn-remove" onClick={() => removeIngredient(idx)}>X</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" className="additem-btn-addrow" onClick={addIngredient}>+ Thêm nguyên vật liệu</button>
                    </div>
                </div>

                <div className="additem-form-right">
                    <div className="additem-image-title">Ảnh đại diện</div>
                    <div className="additem-image-box">
                        {image ? (
                            <img src={image} alt="preview" className="additem-image-preview" />
                        ) : (
                            <span className="additem-image-placeholder">Chọn ảnh đại diện</span>
                        )}
                    </div>
                    <input type="file"id="image-upload"accept="image/*"onChange={handleImageChange} style={{ display: "none" }}/>
                    <div className="additem-image-actions">
                        <label htmlFor="image-upload">
                            <button type="button" className="additem-btn-image" onClick={handleImageClick}>Chọn ảnh</button>
                        </label>
                        {image && (
                            <button type="button" className="additem-btn-remove" onClick={removeImage}>X</button>
                        )}
                    </div>
                    <div className="additem-image-note">Chọn các ảnh có định dạng (.jpg, .jpeg, .png, .webp)</div>
                </div>
            </form>

            <div className="additem-footer">
                <button type="submit" onClick={handleSubmit} className="additem-btn-save">
                    <FaRegSave /> Lưu
                </button>
                <button type="button" className="additem-btn-cancel" onClick={() => window.history.back()}>
                    <HiMiniXMark /> Hủy bỏ
                </button>
                <button type="button" className="additem-btn-help">
                    <IoIosHelp /> Trợ giúp
                </button>
            </div>
        </div>
    );
};

export default AddItem;
