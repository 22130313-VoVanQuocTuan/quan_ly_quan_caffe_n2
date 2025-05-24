import React, { useState } from 'react';
import Header from './header/header';
import './Revenue.css';
import instandURL from '../service/apiConfig';

const Revenue = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [revenues, setRevenues] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [dateError, setDateError] = useState('');

    // 2.5.1.5. Giao diện gửi yêu cầu đến Controller
    const fetchRevenue = async () => {
        if (!startDate || !endDate) {
            setDateError('Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc hợp lệ.');
            setShowReport(false);
            return;
        }

        if (startDate > endDate) {
            setDateError('Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.');
            setShowReport(false);
            return;
        }

        setDateError('');

        try {
            const res = await fetch(
                `${instandURL}/revenue/get-revenue-by-date?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`
            );
            if (res.status === 204) {
                setRevenues([]);
                setShowReport(true);
                return;
            }
            const data = await res.json();
            setRevenues(data);
            setShowReport(true);
            console.log(startDate, endDate, data);
        } catch (err) {
            console.error('Lỗi fetch doanh thu:', err);
        }
    };

    const totalRevenue = revenues.reduce((sum, r) => sum + r.revenue, 0);
    const totalOrders = revenues.reduce((sum, r) => sum + r.numberOfOrder, 0);
    const averagePerOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return (
        <div className="revenue-container">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="revenue-title">BÁO CÁO DOANH THU</h1>

                <div className="revenue-filter-card">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                        <div>
                            {/*/2.5.1.3. Thu ngân chọn ngày bắt đầu và ngày kết thúc : để xác định khoảng thời gian cần thống kê.*/}
                            <label className="block mb-2 font-medium">Từ ngày</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            {/*/2.5.1.3. Thu ngân chọn ngày bắt đầu và ngày kết thúc : để xác định khoảng thời gian cần thống kê.*/}
                            <label className="block mb-2 font-medium">Đến ngày</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex items-end">

                            {/*2.5.1.4. Thu ngân nhấn nút "Xem báo cáo" để gửi yêu cầu*/}
                            <button
                                onClick={fetchRevenue}
                                disabled={!startDate || !endDate}
                                className="revenue-button"
                            >
                                XEM BÁO CÁO
                            </button>


                        </div>
                    </div>
                </div>
                {/*2.5.1.12. Controller trả dữ liệu cho giao diện*/}
                {/*2.5.1.13. Giao diện hiển thị báo cáo một cách trực quan*/}
                {showReport && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="revenue-report-header">
                            KẾT QUẢ BÁO CÁO TỪ {startDate} ĐẾN {endDate}
                        </div>

                        {revenues.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="revenue-table">
                                        <thead>
                                        <tr>
                                            <th>NGÀY</th>
                                            <th>SỐ ĐƠN HÀNG</th>
                                            <th>DOANH THU (VNĐ)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {revenues.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.date}</td>
                                                <td className="text-center">{entry.numberOfOrder}</td>
                                                <td>{entry.revenue.toLocaleString('vi-VN')}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td>TỔNG CỘNG</td>
                                            <td className="text-center">{totalOrders}</td>
                                            <td>{totalRevenue.toLocaleString('vi-VN')}</td>
                                        </tr>
                                        <tr>
                                            <td>TRUNG BÌNH/ĐƠN</td>
                                            <td className="text-center">-</td>
                                            <td>{Math.round(averagePerOrder).toLocaleString('vi-VN')}</td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 border-t border-gray-200">
                                    <div className="revenue-summary-card">
                                        <h3>TỔNG DOANH THU</h3>
                                        <p>{totalRevenue.toLocaleString('vi-VN')} VNĐ</p>
                                    </div>
                                    <div className="revenue-summary-card">
                                        <h3>TỔNG SỐ ĐƠN HÀNG</h3>
                                        <p>{totalOrders}</p>
                                    </div>
                                    <div className="revenue-summary-card">
                                        <h3>TRUNG BÌNH/ĐƠN</h3>
                                        <p>{Math.round(averagePerOrder).toLocaleString('vi-VN')} VNĐ</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="revenue-empty">
                                <h3>Không có dữ liệu</h3>
                                <p>Không tìm thấy đơn hàng nào trong khoảng thời gian đã chọn.</p>
                            </div>
                        )}
                    </div>
                )}
                {dateError && (
                    <div className="text text-sm mt-2 text-center errorText">
                        {dateError}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Revenue;
