import axiosInstance from "./axiosInstance";

// Hàm dể upload ảnh lên Cloudinary
export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // them cac truong thong tin
    formData.append("file", imageFile);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET); // Replace with your actual upload preset

    try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData

    });

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
    try{
        // NẾu có ảnh, upload ảnh lên Cloudinary
        let imageUrl = "";
        if(itemData.image) {
            imageUrl = await uploadImage(itemData.image);
        }

        const payload = {
            name: itemData.name,
            code: itemData.code,
            price: parseFloat(itemData.price),
            menuGroup: itemData.menuGroup,
            quantity: itemData.quantity,
            processAt: itemData.processAt,
            type: itemData.type,
            imageUrl: imageUrl || '', // ảnh đã upload
            ingredients: itemData.ingredients.map(ing => ({
                code: ing.code,
                name: ing.name,
                quantity: parseInt(ing.quantity),
                unit: ing.unit,
            })),
        };

        const response = await axiosInstance.post('/products/add-item', payload); // 5.1.1.9. Gửi dữ liệu qua API /products/add-item
        return response.data;
    } catch (error) {
        console.error("Lỗi thêm món ăn:", error.response?.data || error.message);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};

const validateForm = () => {
    if (!form.code.trim() || !form.name.trim() || !form.price.trim() || !form.quantity.trim() || !form.menuGroup.trim()) {
        toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
        return false;
    }

    for (let ing of form.ingredients) {
        if (!ing.code.trim() || !ing.name.trim() || !ing.quantity || !ing.unit.trim()) {
            toast.error("Vui lòng nhập đầy đủ thông tin nguyên vật liệu!");
            return false;
        }
    }

    return true;
};



