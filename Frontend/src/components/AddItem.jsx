import React, {useState} from "react";
import { FaRegSave } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosHelp } from "react-icons/io";
import "./AddItem.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Thoong so cua cac nguyen lieu
const initialIngredient = { code: "", name: "", quantity: "", unit: "" };

// form them mon
const AddItem = () => {
    const [form, setForm] = useState({
        type: "drink",
        name: "",
        code: "",
        price: "",
        menuGroup: "",
        unit: "",
        processAt: "",
        ingredients:[{...initialIngredient}],
    });
    // Hinhf anh
    const [image, setImagePreview] = useState(null);

     // Handle input change
    const handleChange = (e) => {
        const {name, value}  = e.target;
        setForm({... form, [name]: value});
    };

    //handle radio change
    const handleRadioChange = (e) => {
        setForm({...form, type: e.target.value});
    };

    //handle images upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setForm({...form, image: file});
            setImagePreview(URL.createObjectURL(file));
        }
    };

    //handle ingredient change
    const handleIngredientChange = (index, e) => {
        const {name , value} = e.target;
        const newIngredients = [...form.ingredients];
        newIngredients[index][name] = value;
        setForm({...form, ingredients: newIngredients});
    };

    //preview image
       const handleImageClick = () => {
        document.getElementById("image-upload").click();
    };



    //add new ingredient
    const addIngredient = () => {
        setForm({...form, ingredients: [...form.ingredients, {...initialIngredient}]});
    };

    //remove ingredient
    const removeIngredient = (index) => {
    const newIngredients = form.ingredients.filter((_, i) => i !== index);
    setForm({...form, ingredients: newIngredients});
    };

    // remmove image
    const removeImage = () => {
        setForm({...form, image: ""});
        setImagePreview(null);
    };

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        
       alert("Đã lưu thành công");
    }

    // handle form reset
    return (
        <div className="additem-container">
            <div className="header-item">
                <h2 className="additem-title">Thêm món</h2>
            </div>
            <form className="additem-form" onSubmit={handleSubmit}>
                <div className="additem-form-left">
                    <div className="additem-row">
                        <label className="additem-label">Loại</label>
                        <div className="additem-radio-group">
                            <label className="additem-radio-label">
                                <input type="radio" name="type" value="drink" checked={form.type === "drink"} onChange={handleRadioChange}/>
                                Đồ uống
                            </label>
                            <label className="additem-radio-label">
                                <input type="radio" name="type" value="food" checked={form.type === "food"} onChange={handleRadioChange}/>
                                Món ăn
                            </label>
                        </div>
                    </div>
                    <div className="additem-row additem-row-3col">
                        <div>
                            <label htmlFor="" className="additem-label">Tên món <span className="text-danger">(*)</span></label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required className="additem-input"/>
                        </div>
                         <div>
                            <label htmlFor="" className="additem-label">Mã món <span className="text-danger">(*)</span></label>
                            <input type="text" name="code" value={form.code} onChange={handleChange} required className="additem-input"/>
                        </div>
                        <div>
                            <label htmlFor="" className="additem-label">Giá bán <span className="text-danger">(*)</span></label>
                            <input type="text" name="price" value={form.price} onChange={handleChange} required className="additem-input"/>
                        </div>
                    </div>  

                    <div className="additem-row additem-row-2col">
                        <div>
                            <label htmlFor="" className="additem-label">Nhóm thực đơn</label>
                            <div className="additem-select-group">
                                <select name="menuGroup" value={form.menuGroup} onChange={handleChange} className="additem-input">
                                    <option value="">Chọn Nhóm</option>
                                    <option value="Trà">Trà</option>
                                    <option value="Cà phê">Cà phê</option>
                                    <option value="Sinh tố">Sinh tố</option>
                                </select>
                                <button type="button" className="additem-btn-add btn button">+</button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="" className="additem-label" >Đơn vị tính <span className="required text-danger" >(*)</span></label>
                            <div className="additem-select-group">
                                <select name="unit" value={form.unit} onChange={handleChange} required className="additem-input">\
                                    <option value="">Chọn đơn vị</option>
                                    <option value="Ly">Ly</option>
                                    <option value="Cốc">Cốc</option>
                                </select>
                                <button type="button" className="additem-btn-add btn button">+</button> 
                            </div>
                        </div>
                    </div>

                    <div className="additem-row">
                        <label htmlFor="" className="additem-label">Chế biến tại</label>
                        <div className="additem-select-group">
                            <select name="processAt" value={form.processAt} onChange={handleChange} className="additem-input">
                                <option value="">Chọn nơi chế biến</option>
                                <option value="Quầy bar">Quầy bar</option>
                                <option value="Bếp"> Bếp</option>
                            </select>
                            <button type="button" className="adđitem-btn-add">+</button>
                        </div>
                    </div>


                    <div className="additem-ingredient-section">
                        <label htmlFor="" className="additem-label">
                            Đinh lương nguyên vật liệu 
                            <span className="required">*</span>
                        </label>
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
                                        <td>
                                            <input type="text" name="code" value={ing.code} onChange={e => handleIngredientChange(idx, e)} className="additem-input"/>
                                        </td>

                                        <td>
                                            <input type="text" name="name" value={ing.name} onChange={e => handleIngredientChange(idx, e)} className="additem-input"/>
                                        </td>
                                        <td>
                                            <input type="number" name="quantity" value={ing.quantity} onChange={e => handleIngredientChange(idx, e)} className="additem-input"/>
                                        </td>

                                        <td>
                                           <input type="text" name="unit" value={ing.unit} onChange={e => handleIngredientChange(idx, e)} className="additem-input"/>
                                        </td>

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
                        ):(
                            <span className="additem-image-placeholder">Chọn ảnh đại diện</span>
                        )}
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{display:"none"}} id="image-upload"/>
                    <div className="additem-image-actions">
                        <label htmlFor="image-upload">
                            <button type="button" className="additem-btn-image" onClick={(handleImageClick)}>Chọn ảnh</button>
                        </label>
                        {image && (
                            <button type="button" className="additem-btn-remove" onClick={removeImage}>X</button>
                        )}
                    </div>
                    <div className="additem-image-note">
                        Chọn các ảnh có định dạng (.pg, .jpeg, .png, .webp)
                    </div>
                </div>
            </form>

            <div className="additem-footer">
                <button type="submit" className="additem-btn-save" onClick={handleSubmit}>
                    <span role="img" aria-label="save"><FaRegSave/></span> Lưu
                </button>
                <button type="button" className="additem-btn-cancel" onClick={() => window.history.back()}>
                    <span role="img" aria-label="cancel"><HiMiniXMark/></span> Hủy bỏ
                </button>
                <button type="button" className="additem-btn-help">
                    <span role="img" aria-label="help"><IoIosHelp/></span> Trợ giúp
                </button>
            </div>
        </div>
    )
};
export default AddItem;
