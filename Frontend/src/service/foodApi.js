import axiosInstance from "./axiosInstance";


export const uploadImage = async (imageFile) => {
    const cloudName = "react_unsigned_preset";
    const uploadPreset = "Unsigned";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Lỗi upload ảnh:", error);
        throw error;
    }
};



// Hàm thêm món ăn mới
// 5.1.1.8. Thông tin được foodApi.js lấy dữ liệu từ form bằng addProduct
export const addProduct = async (itemData) => {
    try {
        const payload = {
            name: itemData.name,
            code: itemData.code,
            price: parseFloat(itemData.price),
            menuGroup: itemData.menuGroup,
            quantity: itemData.quantity,
            processAt: itemData.processAt,
            type: itemData.type,
            imageUrl: itemData.image, // Không upload Cloudinary nữa
            ingredients: itemData.ingredients.map(ing => ({
                code: ing.code,
                name: ing.name,
                quantity: parseInt(ing.quantity),
                unit: ing.unit,
            })),
        };

        const response = await axiosInstance.post('/products/add-item', payload);
        return response.data;
    } catch (error) {
        console.error("Lỗi thêm món ăn:", error.response?.data || error.message);
        throw error;
    }
};




