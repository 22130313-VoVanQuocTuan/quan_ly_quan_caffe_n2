import React, { useState } from 'react'
import Header from './header/header'
import './home.css'
import {search, person, numbers, kitchent,close} from '../assets/icons'


function closeModal(){
  const modal = document.getElementById("modal");
  if(modal){
  modal.style.display = "none";
  }
}
function openMessage(){
  const modalMess= document.getElementById("modalMessage")
  if(modalMess){
    modalMess.style.display= "block"
  }
}
function closeModalMessage(){
  const modalMess= document.getElementById("modalMessage")
  if(modalMess){
    modalMess.style.display= "none"
  }
}


const Home = () => {
  const [canChooseItems, setCanChooseItems] = useState(false);

  const openModelConfirm = (namem , price) => {
    if (!canChooseItems) return; // ngăn mở modal nếu chưa nhấn "Tạo thực đơn"
  
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "block";
    }
  }

  return (
     <div>
      <Header />
      <div className='body'>
        <div className='left'>
            <div className='coffe'>
                <span>Coffe</span>

            </div>
            <div className='search'>
                <div className='input-container'>
                    <input type="text" placeholder='Nhập tên món'  />
                    <img src={search} alt="search" className="search-icon" />
                </div>
            </div>
            <div className="listP">
              <div  className="item" onClick={() => openModelConfirm("Coffee 4", 20000)}>
                <img src="https://img.freepik.com/free-photo/delicious-coffee-cup-indoors_23-2150691359.jpg?semt=ais_hybrid&w=740" alt="" />
                <div className='footer'>
                  <label htmlFor=""> Coffee 4</label>
                  <label htmlFor="">20.000đ</label>
                </div>
              </div>
              <div className="item">Item 2</div>
              <div className="item">Item 3</div>
              <div className="item">Item 4</div>
              <div className="item">Item 5</div>
           </div>
        </div>
         
        <div className='right'>
          <div className='head1'>
            <div className='addP'>
              <button>Thêm món mới</button>
            </div>
            <div className='person'>
              <label htmlFor="">Name</label>
              <img src={person} alt="person" />
            </div>
          </div>
          <div className='content2'>
              <select id='ban' >
                <option value="">Bàn 1</option>
                <option value="">Bàn 2</option>
                <option value="">Bàn 3</option>
                <option value="">Bàn 4</option>
                <option value="">Bàn 5</option>

              </select>

              <div className='number'>
                  <img src={numbers} alt="" />
                  <label htmlFor="">5</label>
              </div>
          </div>
          <div className='content3'>
            <table>
              <thead>
                <tr>
                  <th>Tên món</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coffe 1</td>
                  <td>3</td>
                  <td>40.000 đ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='total'>
            <label htmlFor="">Tổng tiền: </label>
            <label htmlFor="" id='price'>40.000đ</label>
          </div>

          <div className='content4'>
            <button className='create' onClick={()=>{
              setCanChooseItems(true); // Cho phép chọn món
              openMessage()}}
              >Tạo thực đơn</button>
            <button className='confirm'>Xác nhận thực đơn</button>

            <button className='send'>
              <img src={kitchent} alt="" />
              <label htmlFor="">Gửi</label>
            </button>
            <button className='close'>
              <img src={close} alt="" />
              <label htmlFor="">Hủy bỏ</label>
            </button>

          </div>
       

        </div>
        
      </div>
      

     <div className='modal' id='modal'>
      <label htmlFor="">Thêm món này vào thực đơn</label>
      <input type="number" name="" id="" placeholder='số lượng' />
      <div className='bt'>
      <button>Đồng ý</button>
      <button onClick={()=> closeModal()}>Hủy</button>
      </div>
     </div>
     <div className='modal' id='modalMessage'>
      <label htmlFor="">Vui lòng chọn món</label>
      <div className='bt'>
      <button onClick={()=> closeModalMessage()}>Oke</button>
      </div>
     </div>
      
    </div>
  )

}
export default Home
