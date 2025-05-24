import axiosInstance from "./axiosInstance";


export const uploadImage = async (imageFile) => {
    const cloudName = "djhqmrh8s"; // Thay bằng Cloud Name thực tế của bạn
    const uploadPreset = "react_name"; // Thay bằng Upload Preset thực tế của bạn

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

        if (!response.ok) {
            throw new Error(`Upload thất bại với mã lỗi: ${response.status}`);
        }

        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url; // Trả về URL của ảnh đã upload
        } else {
            throw new Error("Upload ảnh thất bại: Không nhận được secure_url");
        }
    } catch (error) {
        console.error("Lỗi upload ảnh:", error);
        throw error; // Ném lỗi để xử lý ở hàm gọi
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




