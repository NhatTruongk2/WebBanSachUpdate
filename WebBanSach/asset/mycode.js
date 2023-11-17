
$(document).ready(function () {
    // Sự kiện khi nút "Đăng ký" được bấm

    $(".chonsach").click(function(){
        var apiURL = 'api_tacgia.aspx';
        $.post(apiURL, {
            action: 'TimKiemSach',
        }, function (data) {
            // Xử lý dữ liệu sau khi nhận được từ API
            console.log(data); // In dữ liệu lấy được từ API vào console
            var json = JSON.parse(data);
            var noidung_sach_html = "";
            // Sử dụng hàm confirm để hiển thị dữ liệu lấy được từ API
            if (json.ok) {
                noidung_sach_html += `<table  class="table table-hover">`
                noidung_sach_html += `<thead>
                    <tr>    
        <th>  STT   </th>
                    <th>  Tên sách    </th>
                  
                    <th>  Giá    </th>
                    <th>  Lựa chọn    </th>
     
                    </tr>
                    </thead>`
                var STT = 0;
                for (var sach of json.data) {
                    

                    var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaSach}" data-loai = "mua">Sửa <i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>`;
                   
                    mua_them += `        <button class="btn btn-danger nut_mua_them" data-cid="${sach.MaSach}" data-loai = "xoa">Xóa <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button>`

                    noidung_sach_html += `
                         <tr>
             <th>  ${++STT}    </th>
                        <th>${sach.TenSach}</th>
                     
                        <th style=" font-weight: bold;  color: #007bff; font-size: 18px; ">Giá : ${sach.GiaBan} VNĐ</th>
                        <th>${mua_them}</th>
       
                        </tr>`;
                }

                $('.hienthithongtin').html(noidung_sach_html);
                console.log(json.data);
                console.log(data);



                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai');
                    var id = $(this).data('cid');

                    if (loai === 'xoa') { // Kiểm tra nút được nhấn có loại là 'xoa' hay không
                        for (var sach2 of json.data) {
                            if (sach2.MaSach == id) {
                                xoa_sach(sach2); // Gọi hàm xoa_sach khi nút "Xóa" được nhấn
                                break;
                            }
                        }
                    } else {
                        for (var sach2 of json.data) {
                            if (sach2.MaSach == id) {
                                sua_sach(sach2);
                                break;
                            }
                        }
                    }
                });


            }

        });

        function xoa_sach(sach2) {
            $.confirm({
                title: 'Bạn có muốn xóa không?',
                content: '     ',
                buttons: {
                    mua: {
                        text: 'OK',
                        btnClass: 'btn-red' ,
                        action: function () {
                            $.post('api_tacgia.aspx', {
                                action: 'XoaSach',
                                MaSach: sach2.MaSach // Truyền ID của sách cần xóa
                            })
                                .done(function (data) {
                                    console.log('Sách đã bị xóa:', data);
                                    // Thực hiện các hành động sau khi xóa thành công (nếu cần)
                                })
                                .fail(function (error) {
                                    console.error('Lỗi khi xóa sách:', error);
                                    // Xử lý khi xóa sách thất bại (nếu cần)
                                });
                        }
                    },
                    huy: {
                        text: 'KHUM',
                        btnClass: 'btn-green',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }
                },
                columnClass: 'large'
            });
        }



        function sua_sach(sach22) {
            var thongtin_sach_html = "";
            $.confirm({
                title: '<h2 > CẬP NHẬT THÔNG TIN </h2>',
                content: thongtin_sach_html += `
<div style="display: flex; align-items: center; justify-content: center; margin: 20px;">
    <div style="margin-right: 20px;">
        <img style="width: 300px; height: 400px; object-fit: cover;" src="${sach22.AnhBia}" alt="${sach22.TenSach}">
    </div>
    <div style="text-align: left; display: flex; flex-direction: column;">
     <p style="font-weight: bold; width: 150px;">Mã sách: <input type="text" id="maSachInput" value="${sach22.MaSach}"></p>
        <p style="font-weight: bold; width: 150px;">Tên sách: <input type="text" id="tenSachInput" value="${sach22.TenSach}"></p>
        <p style="font-weight: bold; color: #007bff; font-size: 18px; width: 150px;">Giá bán: <input type="text" id="giaBanInput" value="${sach22.GiaBan}"></p>
        <p style="width: 150px;">Ngày cập nhật: <input type="text" id="ngayCapNhatInput" value="${sach22.NgayCapNhat}"></p>
        <p style="width: 150px;">Mô tả: <input type="text" id="moTaInput" value="${sach22.MoTa}"></p>
        <p style="width: 150px;">Số lượng trong kho: <input type="text" id="soLuongTonInput" value="${sach22.SoLuongTon}"> </p>
        <p style="width: 150px;">Ảnh bìa: <input type="text" id="anhBiaInput" value="${sach22.AnhBia}"></p>
        <p style="width: 150px;">Mã nhà xuất bản: <input type="text" id="maNhaXuatBanInput" value="${sach22.MaNXB}"></p>
        <p style="width: 150px;">Mã chủ đề : <input type="text" id="maChuDeInput" value="${sach22.MaChuDe}"></p>
    </div>
</div>`,
    
                buttons: {
                    mua: {
                        text: 'Sửa',
                        btnClass: 'btn-green',
                        
                        action: function () {
                            // Collect the updated values from the input fields
                            var maSach = $('#maSachInput').val();
                            var tenSach = $('#tenSachInput').val();
                            var giaBan = $('#giaBanInput').val();
                            var ngayCapNhat = $('#ngayCapNhatInput').val();
                            var moTa = $('#moTaInput').val();
                            var soLuongTon = $('#soLuongTonInput').val();
                            var anhBia = $('#anhBiaInput').val();
                            var maNhaXuatBan = $('#maNXBInput').val();
                            var maChuDe = $('#MaChuDe').val();

                            var data = {
                                MaSach :maSach,
                                TenSach: tenSach,
                                GiaBan: giaBan,
                                NgayCapNhat: ngayCapNhat,
                                MoTa: moTa,
                                SoLuongTon: soLuongTon,
                                AnhBia: anhBia,
                                MaNXB: maNhaXuatBan,
                                MaChuDe: maChuDe
                            };
                           
                            $.post(apiURL, {
                                action: 'SuaSach',
                                MaSach: $('#maSachInput').val(),
                                TenSach: $('#tenSachInput').val(),
                                AnhBia: $('#anhBiaInput').val(),
                                GiaBan: $('#giaBanInput').val(),
                                NgayCapNhat: $('#ngayCapNhatInput').val(),
                                SoLuongTon: $('#soLuongTonInput').val(),
                                MoTa: $('#moTaInput').val(),
                                MaNXB: $('#maNhaXuatBanInput').val(),
                                MaChuDe: $('#maChuDeInput').val()
                            }, function (data) {
                                // Xử lý kết quả trả về từ API
                                console.log("Dữ liệu từ API:", data);
                            }).fail(function (error) {
                                // Xử lý lỗi trong quá trình yêu cầu API
                                console.error("Lỗi:", error);
                            });

                            // Do something with the collected data
                         
                    // ... Handle the data accordingly
                        }
                    },
                    huy: {
                        text: 'Thoát',
                        btnClass: 'btn-red',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }

                },
                columnClass: 'large'
            });
        }

    });

    $('.chondonhang').click(function () {
        var apiURL = 'api_tacgia.aspx';
        $.post(apiURL, {
            action: 'LietKeDonHang',
        
        }, function (data) {
            // Xử lý dữ liệu sau khi nhận được từ API
            console.log(data); // In dữ liệu lấy được từ API vào console
            var json = JSON.parse(data);
            var noidung_sach_html = "";
            // Sử dụng hàm confirm để hiển thị dữ liệu lấy được từ API
            if (json.ok) {
                noidung_sach_html += `<table  class="table table-hover">`
                noidung_sach_html += `<thead>
                    <tr>    
        <th>  STT   </th>
                    <th> Mã Đơn Hàng     </th>
                  
                    <th>  Đã thanh toán   </th>
                    <th>  Tình trạng giao hàng   </th>
      
                    <th>  Ngày đặt   </th>
                    <th>  Ngày giao   </th>
                    <th>  Mã khách hàng   </th>
                    </tr>
                    </thead>`
                var STT = 0;
                for (var sach of json.data) {


                    var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaDonHang}" data-loai = "mua">Chi Tiết <i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>`;

                    mua_them += `        <button class="btn btn-danger nut_mua_them" data-cid="${sach.MaDonHang}" data-loai = "xoa">Xóa <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button>`

                    noidung_sach_html += `
                         <tr>
             <th>  ${++STT}    </th>
                        <th>${sach.MaDonHang}</th>
                     <th>${sach.DaThanhToan}</th>
                     <th>${sach.TinhTrangGiaoHang}</th>
                     <th>${sach.NgayDat}</th>

                     <th>${sach.NgayGiao}</th>
                     <th>${sach.MaKH}</th>
                       
                        <th>${mua_them}</th>
       
                        </tr>`;
                }

                $('.hienthithongtin').html(noidung_sach_html);
                console.log(json.data);
                console.log(data);



                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai');
                    var id = $(this).data('cid');

                    if (loai === 'xoa') { // Kiểm tra nút được nhấn có loại là 'xoa' hay không
                        for (var sach2 of json.data) {
                            if (sach2.MaDonHang == id) {
                                xoa_sach(sach2); // Gọi hàm xoa_sach khi nút "Xóa" được nhấn
                                break;
                            }
                        }
                    } else {
                        for (var sach2 of json.data) {
                            if (sach2.MaDonHang == id) {
                                sua_sach(sach2);
                                break;
                            }
                        }
                    }
                });


            }

        });

        function xoa_sach(sach2) {
            $.confirm({
                title: 'Bạn có muốn xóa không?',
                content: '     ',
                buttons: {
                    mua: {
                        text: 'OK',
                        btnClass: 'btn-red',
                        action: function () {
                            $.post('api_tacgia.aspx', {
                                action: 'XoaDonHang',
                                MaDonHang: sach2.MaDonHang // Truyền ID của sách cần xóa
                            })
                                .done(function (data) {
                                    console.log('Sách đã bị xóa:', data);
                                    // Thực hiện các hành động sau khi xóa thành công (nếu cần)
                                })
                                .fail(function (error) {
                                    console.error('Lỗi khi xóa sách:', error);
                                    // Xử lý khi xóa sách thất bại (nếu cần)
                                });
                        }
                    },
                    huy: {
                        text: 'KHUM',
                        btnClass: 'btn-green',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }
                },
                columnClass: 'large'
            });
        }


        function sua_sach(sach22) {
            var thongtin_sach_html = "";
            $.confirm({
                title: '<h2 > CẬP NHẬT THÔNG TIN </h2>',
                content: thongtin_sach_html += `
<div style="display: flex; align-items: center; justify-content: center; margin: 20px;">
  
    <div style="text-align: left; display: flex; flex-direction: column;">
     <p style="font-weight: bold; width: 150px;">Mã đơn hàng: <input type="text" id="maDonHangInput" value="${sach22.MaDonHang}"></p>
        <p style="font-weight: bold; width: 150px;">Đã thanh toán: <input type="text" id="daThanhToanInput" value="${sach22.DaThanhToan}"></p>
        <p style="width: 150px;">Tình trạng giao hàng: <input type="text" id="tinhTrangGiaoHangInput" value="${sach22.TinhTrangGiaoHang}"></p>
        <p style="width: 150px;">Ngày đặt: <input type="text" id="ngayDatInput" value="${sach22.NgayDat}"></p>
                <p style="width: 150px;">Ngày giao: <input type="text" id="ngayGiaoInput" value="${sach22.NgayGiao}"></p>


        <p style="width: 150px;">Mã khách hàng: <input type="text" id="maKHInput" value="${sach22.MaKH}"></p>

    </div>
</div>`,

                buttons: {
                    mua: {
                        text: 'Sửa',
                        btnClass: 'btn-green',

                        action: function () {
                            // Collect the updated values from the input fields
                            var maDonHang = $('#maDonHangInput').val();
                            var daThanhToan = $('#daThanhToanInput').val();
                            var tinhTrangGiaoHang = $('#tinhTrangGiaoHangInput').val();
                            var ngayDat = $('#ngayDatInput').val();
                            var ngayGiao = $('#ngayGiaoInput').val();
                            var maKH = $('#maKHInput').val();
                
                         

                            var data = {
                                MaDonHang: maDonHang,
                                DaThanhToan: daThanhToan,
                                TinhTrangGiaoHang: tinhTrangGiaoHang,
                                NgayDat: ngayDat,
                                NgayGiao: ngayGiao,
                                MaKH: maKH,
                            
                            };

                            $.post(apiURL, {
                                action: 'SuaSach',
                                MaDonHang: $('#maDonHang').val(),
                                DaThanhToan: $('#daThanhToan').val(),
                                TinhTrangGiaoHang: $('#tinhTrangGiaoHang').val(),
                                NgayDat: $('#ngayDat').val(),
                                NgayGiao: $('#ngayGiao').val(),
                                MaKH: $('#maKH').val(),
                             
                               
                            }, function (data) {
                                // Xử lý kết quả trả về từ API
                                console.log("Dữ liệu từ API:", data);
                            }).fail(function (error) {
                                // Xử lý lỗi trong quá trình yêu cầu API
                                console.error("Lỗi:", error);
                            });

                            // Do something with the collected data

                            // ... Handle the data accordingly
                        }
                    },
                    huy: {
                        text: 'Thoát',
                        btnClass: 'btn-red',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }

                },
                columnClass: 'large'
            });
        }
       


    });

    $('.chontacgia').click(function () {
        var apiURL = 'api_tacgia.aspx';
        $.post(apiURL, {
            action: 'LietKeTacGia',

        }, function (data) {
            // Xử lý dữ liệu sau khi nhận được từ API
            console.log(data); // In dữ liệu lấy được từ API vào console
            var json = JSON.parse(data);
            var noidung_sach_html = "";
            // Sử dụng hàm confirm để hiển thị dữ liệu lấy được từ API
            if (json.ok) {
                
                noidung_sach_html += `<table  class="table table-hover">`
                noidung_sach_html += `<thead>
                    <tr>    
                    <th>  STT   </th>
                    <th> Mã Tác giả     </th>
                  
                    <th>  Tên tác giả   </th>
                    <th>   Địa chỉ  </th>
      
                    <th>  Tiểu sử   </th>
                    <th>  Điện thoại   </th>
                 
                    </tr>
                    </thead>`
                var STT = 0;
                for (var tacgia of json.data) {

                    



                    var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${tacgia.matacgia}" data-loai = "mua">Sửa <i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>`;

                    mua_them += `        <button class="btn btn-danger nut_mua_them" data-cid="${tacgia.matacgia}" data-loai = "xoa">Xóa <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button>`

                    noidung_sach_html += `
                         <tr>
                        <th>  ${++STT}    </th>
                        <th>${tacgia.matacgia}</th>
                     <th>${tacgia.tentacgia}</th>
                     <th>${tacgia.diachi}</th>
                     <th>${tacgia.tieusu}</th>

                     <th>${tacgia.dienthoai}</th>
                    
                       
                        <th>${mua_them}</th>
       
                        </tr>`;
                }

                $('.hienthithongtin').html(noidung_sach_html);
                console.log(json.data);
                console.log(data);


                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai');
                    var id = $(this).data('cid');

                    if (loai == 'xoa') { // Kiểm tra nút được nhấn có loại là 'xoa' hay không
                        for (var sach2 of json.data) {
                            if (sach2.matacgia == id) {
                                xoa_tacgia(sach2); // Gọi hàm xoa_sach khi nút "Xóa" được nhấn
                                break;
                            }
                        }
                    } else {
                        for (var sach2 of json.data) {
                            if (sach2.matacgia == id) {
                                sua_tacgia(sach2);
                                break;
                            }
                        }
                    }
                });


            }

        });

        function xoa_tacgia(sach2) {
            $.confirm({
                title: 'Bạn có muốn xóa không?',
                content: '     ',
                buttons: {
                    mua: {
                        text: 'OK',
                        btnClass: 'btn-red',
                        action: function () {
                            $.post('api_tacgia.aspx', {
                                action: 'XoaTacGia',
                                matacgia: sach2.matacgia // Truyền ID của sách cần xóa
                            })
                                .done(function (data) {
                                    console.log('Sách đã bị xóa:', data);
                                    // Thực hiện các hành động sau khi xóa thành công (nếu cần)
                                })
                                .fail(function (error) {
                                    console.error('Lỗi khi xóa sách:', error);
                                    // Xử lý khi xóa sách thất bại (nếu cần)
                                });
                        }
                    },
                    huy: {
                        text: 'KHUM',
                        btnClass: 'btn-green',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }
                },
                columnClass: 'large'
            });
        }


        function sua_tacgia(sach22) {
            var thongtin_sach_html = "";
            $.confirm({
                title: '<h2 > CẬP NHẬT THÔNG TIN </h2>',
                content: thongtin_sach_html += `
<div style="display: flex; align-items: center; justify-content: center; margin: 20px;">
  
    <div style="text-align: left; display: flex; flex-direction: column;">
     <p style="font-weight: bold; width: 150px;">Mã tác giả: <input type="text" id="maTacGiaInput" value="${sach22.matacgia}"></p>
        <p style="font-weight: bold; width: 150px;">Tên tác giả: <input type="text" id="tenTacGiaInput" value="${sach22.tentacgia}"></p>
        <p style="width: 150px;">Địa chỉ: <input type="text" id="diaChiInput" value="${sach22.diachi}"></p>
        <p style="width: 150px;">Tiểu sử: <input type="text" id="tieuSuInput" value="${sach22.tieusu}"></p>
                <p style="width: 150px;">Điện thoại: <input type="text" id="dienThoaiInput" value="${sach22.dienthoai}"></p>



    </div>
</div>`,

                buttons: {
                    mua: {
                        text: 'Sửa',
                        btnClass: 'btn-green',

                        action: function () {
                            // Collect the updated values from the input fields
                            var maTacGia = $('#maTacGiaInput').val();
                            var tenTacGia = $('#tenTacGiaInput').val();
                            var diaChi = $('#diaChiInput').val();
                            var tieuSu = $('#tieuSuInput').val();
                            var dienThoai = $('#dienThoaiInput').val();
                            



                            var data = {
                                matacgia: maTacGia,
                                tentacgia: tenTacGia,
                                diachi: diaChi,
                                tieusu: tieuSu,
                                dienthoai: dienThoai,
                               

                            };

                            $.post(apiURL, {
                                action: 'SuaTacGia',
                                matacgia: $('#maTacGia').val(),
                                tentacgia: $('#tenTacGia').val(),
                                diachi: $('#diaChi').val(),
                                tieusu: $('#tieuSu').val(),
                                dienthoai: $('#dienThoai').val(),
                                

                            }, function (data) {
                                // Xử lý kết quả trả về từ API
                                console.log("Dữ liệu từ API:", data);
                            }).fail(function (error) {
                                // Xử lý lỗi trong quá trình yêu cầu API
                                console.error("Lỗi:", error);
                            });

                            // Do something with the collected data

                            // ... Handle the data accordingly
                        }
                    },
                    huy: {
                        text: 'Thoát',
                        btnClass: 'btn-red',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }

                },
                columnClass: 'large'
            });
        }



    });

    $(".chonnguoidung").click(function () {
        var apiURL = 'api_tacgia.aspx';
        $.post(apiURL, {
            action: 'LietKeKhachHang',
        }, function (data) {
            // Xử lý dữ liệu sau khi nhận được từ API
            console.log(data); // In dữ liệu lấy được từ API vào console
            var json = JSON.parse(data);
            var noidung_khach_html = "";
            // Sử dụng hàm confirm để hiển thị dữ liệu lấy được từ API
            if (json.ok) {
                noidung_khach_html += `<table  class="table table-hover">`
                noidung_khach_html += `<thead>
                    <tr>    
        <th>  STT   </th>
                    <th>  Tên khách hàng    </th>
                    <th>   Tài Khoản   </th>
                    <th>  Email    </th>
                    <th>  Lựa chọn    </th>
                     <th>    </th>
     
                    </tr>
                    </thead>`
                var STT = 0;
                for (var sach of json.data) {


                    var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaKH}" data-loai = "mua">Sửa <i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>`;

                    mua_them += `        <button class="btn btn-danger nut_mua_them" data-cid="${sach.MaKH}" data-loai = "xoa">Xóa <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></button>`

                    noidung_khach_html += `
                         <tr>
             <th>  ${++STT}    </th>
                        <th>${sach.HoTen}</th>
                       <th>${sach.TaiKhoan}</th>
                        <th>${sach.Email}</th>
                        <th>${mua_them}</th>
             <th>    </th>
                        </tr>`;
                }

                $('.hienthithongtin').html(noidung_khach_html);
                


                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai');
                    var id = $(this).data('cid');

                    if (loai == 'xoa') { // Kiểm tra nút được nhấn có loại là 'xoa' hay không
                        for (var sach2 of json.data) {
                            if (sach2.MaKH == id) {
                                xoa_KH(sach2); // Gọi hàm xoa_sach khi nút "Xóa" được nhấn
                                break;
                            }
                        }
                        } else {
                        for (var sach2 of json.data) {
                            if (sach2.MaKH == id) {
                                sua_KH(sach2);
                                break;
                            }
                        }
                    }
                });


            }

        });

        function xoa_KH(sach2) {
            $.confirm({
                title: 'Bạn có muốn xóa không?',
                content: '     ',
                buttons: {
                    mua: {
                        text: 'OK',
                        btnClass: 'btn-red',
                        action: function () {
                            $.post('api_tacgia.aspx', {
                                action: 'XoaKhachHang',
                                MaKH: sach2.MaKH // Truyền ID của sách cần xóa
                            })
                                .done(function (data) {
                                    console.log('Tài khoản đã bị xóa:', data);
                                    // Thực hiện các hành động sau khi xóa thành công (nếu cần)
                                })
                                .fail(function (error) {
                                    console.error('Lỗi khi xóa tài khoản:', error);
                                    // Xử lý khi xóa sách thất bại (nếu cần)
                                });
                        }
                    },
                    huy: {
                        text: 'KHUM',
                        btnClass: 'btn-green',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }
                },
                columnClass: 'large'
            });
        }



        function sua_KH(sach22) {
            var noidung_khach_html = "";
            $.confirm({
                title: '<h2 > CẬP NHẬT THÔNG TIN </h2>',
                content: noidung_khach_html += `
<div style="display: flex; align-items: center; justify-content: center; margin: 20px;">
    <div style="margin-right: 20px;">
        
    </div>
    <div style="text-align: left; display: flex; flex-direction: column;">
     <p style="font-weight: bold; width: 150px;">Mã khách hàng: <input type="text" id="maKHInput" value="${sach22.MaKH}"></p>
        <p style="font-weight: bold; width: 150px;">Tên khách hàng: <input type="text" id="tenKhachHangInput" value="${sach22.HoTen}"></p>
        <p style="font-weight: bold; color: #007bff; font-size: 18px; width: 150px;">Tài khoản: <input type="text" id="taiKhoanInput" value="${sach22.TaiKhoan}"></p>
        <p style="width: 150px;">Mật khẩu: <input type="text" id="matKhauInput" value="${sach22.MatKhau}"></p>
        <p style="width: 150px;">Email: <input type="text" id="emailInput" value="${sach22.Email}"></p>
        <p style="width: 150px;">Địa chỉ: <input type="text" id="diaChiInput" value="${sach22.DiaChi}"> </p>
        <p style="width: 150px;">Điện thoại: <input type="text" id="dienThoaiInput" value="${sach22.DienThoai}"></p>
        <p style="width: 150px;">Giới tính : <input type="text" id="gioiTinhInput" value="${sach22.GioiTinh}"></p>
        <p style="width: 150px;">Ngày sinh : <input type="text" id="ngaySinhInput" value="${sach22.NgaySinh}"></p>
    </div>
</div>`,

                buttons: {
                    mua: {
                        text: 'Sửa',
                        btnClass: 'btn-green',

                        action: function () {
                            // Collect the updated values from the input fields
                            var maKH = $('#maKHInput').val();
                            var hoTen = $('#tenKhachHangInput').val();
                            var taiKhoan = $('#taiKhoanInput').val();
                            var matKhau = $('#matKhauInput').val();
                            var email = $('#emailInput').val();
                            var diaChi = $('#diaChiInput').val();
                            var dienThoai = $('#dienThoaiInput').val();
                            var gioiTinh = $('#gioiTinhInput').val();
                            var ngaySinh = $('#ngaySinhInput').val();

                            var data = {
                                MaKH: maKH,
                                HoTen: hoTen,
                                TaiKhoan: taiKhoan,
                                MatKhau: matKhau,
                                Email: email,
                                DiaChi: diaChi,
                                DienThoai: dienThoai,
                                GioiTinh: gioiTinh,
                                NgaySinh: ngaySinh
                            };

                            $.post(apiURL, {
                                action: 'SuaKhachHang',
                                MaKH: $('#maKHInput').val(),
                                HoTen: $('#tenKhachHangInput').val(),
                                TaiKhoan: $('#taiKhoanInput').val(),
                                MatKhau: $('#matKhauInput').val(),
                                Email: $('#emailInput').val(),
                                DiaChi: $('#diaChiInput').val(),
                                DienThoai: $('#dienThoaiInput').val(),
                                GioiTinh: $('#gioiTinhInput').val(),
                                NgaySinh: $('#ngaySinhInput').val()
                            }, function (data) {
                                // Xử lý kết quả trả về từ API
                                console.log("Dữ liệu từ API:", data);
                            }).fail(function (error) {
                                // Xử lý lỗi trong quá trình yêu cầu API
                                console.error("Lỗi:", error);
                            });

                            // Do something with the collected data

                            // ... Handle the data accordingly
                        }
                    },
                    huy: {
                        text: 'Thoát',
                        btnClass: 'btn-red',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }

                },
                columnClass: 'large'
            });
        }

    });

    $("#nuttimsach").click(function () {
        var apiURL = 'api_tacgia.aspx';

        $.post(apiURL, {
            action: 'TimKiemSach',
            TenSach: $('#timkiemsach').val(),
           }, function (data) {
            // Xử lý dữ liệu sau khi nhận được từ API
            console.log(data); // In dữ liệu lấy được từ API vào console
            var json = JSON.parse(data);
            var thongtintimkiem = "";
            // Sử dụng hàm confirm để hiển thị dữ liệu lấy được từ API
            if (json.ok) {
               
                for (var sach of json.data) {
                    var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaSach}" data-loai = "mua">Mua <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`
                    mua_them += `    <button class=" btn btn-primary nut_mua_them" data-cid="${sach.MaSach}" data-loai = "xoa">Chi tiết  </button>`
                    thongtintimkiem += `
                        <div class="book-container" style="width: 22%;height :380px;  margin: 10px; text-align: center; border: 1px solid #ccc; padding: 10px; display: inline-block; box-sizing: border-box;transition: box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'" onmouseout="this.style.boxShadow='none';">
    <img src="${sach.AnhBia}" alt="Ảnh bìa sách" style="width: 150px; height:  200px; margin-bottom: 10px;">
    <h2 style="font-size: 18px; margin-bottom: 5px;">${sach.TenSach}</h2>
    <p class="book-price" style="font-weight: bold; color: #FF5733;">${sach.GiaBan} VNĐ</p>
   <p>${mua_them}</p>
</div>`;
                }

                $('#danhmucsach').html(thongtintimkiem);
                console.log(json.data);
                console.log(data);

             

                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai');
                    var id = $(this).data('cid');

                    if (loai == 'xoa') { // Kiểm tra nút được nhấn có loại là 'xoa' hay không
                        for (var sach2 of json.data) {
                            if (sach2.MaSach == id) {
                                chi_tiet(sach2);   // Gọi hàm xoa_sach khi nút "Xóa" được nhấn
                                break;
                            }
                        }
                    } else {
                        for (var sach2 of json.data) {
                            if (sach2.MaSach == id) {
                                mua_sach(sach2);
                                break;
                            }
                        }
                    }
                });


            }
           
        });

        function chi_tiet(sach22) {
            $.post(apiURL, {
                action: "LietKeChuDe" // Sử dụng action "LietKeChuDe" cho chủ đề
            }, function (data) {
                var json = JSON.parse(data);
                var noidung_chude_html = "";
                if (json.ok) {

                    var noidung_chude_html = '<div class="list-group" style="display: flex; flex-direction: column;">';

                    for (var chude of json.data) {

                        var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach22.MaSach}" data-loai = "mua">Mua <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`
                        mua_them += `<button class=" btn btn-success nut_quay_lai" data-cid="${sach22.MaSach}" data-loai = "quaylai"> Quay lại <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`
                        noidung_chude_html = `
           <div style="display: flex; align-items: center; justify-content: center;">
    <div style="margin-right: 20px;">
        <img style="width: 200px; height: 300px;" src="${sach22.AnhBia}" alt="${sach22.TenSach}">
    </div>
    <div style="text-align: left;">
        <p class="h2" style="font-weight: bold;">Tên sách: ${sach22.TenSach}</p>
        <p style="font-weight: bold; color: #007bff; font-size: 18px;">Giá bán: ${sach22.GiaBan}vnđ</p>
        <p>Ngày cập nhật: ${sach22.NgayCapNhat}</p>
        <p>Mô tả: ${sach22.MoTa}</p>
        <p>Số lượng trong kho : ${sach22.SoLuongTon} quyển</p>
        <p>${mua_them}</p>
        <!-- Thêm các thông tin sách khác vào đây -->
    </div>
</div>
`;
                    }


                } else {
                    noidung_chude_html = "Không có dữ liệu";
                }
                $('#danhmucsach').html(noidung_chude_html);

                $('.nut_quay_lai').click(function () {

                    window.location.href = 'nguoidung.html';
                }
                );
            });



        }

        function mua_sach(sach22) {
            var thongtin_sach_html = "";
            $.confirm({
                title: '',
                content: thongtin_sach_html += `
                <div style="display: flex; align-items: center; justify-content: center;">
            <div style="margin-right: 20px;">
                <img style = " width = 300px; height=400px;"src="${sach22.AnhBia}" alt="${sach22.TenSach}" >
            </div>
            <div style="text-align: left;">
                <p class="h2" style = "font-weight: bold;"" >Tên sách: ${sach22.TenSach}</p>
                <p style=" font-weight: bold;  color: #007bff; font-size: 18px; ">Giá bán: ${sach22.GiaBan}vnđ</p>
                <p>Ngày cập nhật: ${sach22.NgayCapNhat}</p>
                <p>Mô tả: ${sach22.MoTa}</p>
                <p>Số lượng trong kho : ${sach22.SoLuongTon} quyển </p>
                <!-- Thêm các thông tin sách khác vào đây -->
            </div>
        </div>`,
                buttons: {
                    mua: {
                        text: 'Mua',
                        btnClass: 'btn-green',


                        action: function () {
                            // Xử lý khi nhấn nút "Mua"
                            alert('Đã mua sách: ' + sach22.TenSach);
                        }
                    },
                    huy: {
                        text: 'Hủy',
                        btnClass: 'btn-red',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }

                },
                columnClass: 'xxlarge'
            });
        }
    });

    $(".themsach").click(function () {

        var contentthemsach = `
    <form>
       
        <div class="form-group">
            <label for="tenSach">Tên sách</label>
            <input type="text" id="tenSach" class="tenSach form-control"  required />
        </div>
        <div class="form-group">
            <label for="giaBan">Giá bán</label>
            <input type="text" id="giaBan" class="giaBan form-control" values =  required />
        </div>
        <div class="form-group">
            <label for="moTa">Mô tả</label>
            <input type="text" id="moTa" class="moTa form-control"  required />
        </div>
        <div class="form-group">
            <label for="anhBia">Ảnh bìa</label>
            <input type="text" id="anhBia" class="anhBia form-control"  required />
        </div>
        <div class="form-group">
            <label for="ngayCapNhat">Ngày cập nhật</label>
            <input type="date" id="ngayCapNhat" class="ngayCapNhat form-control"  required />
        </div>
        <div class="form-group">
            <label for="soLuongTon">Số lượng tồn</label>
            <input type="text" id="soLuongTon" class="soLuongTon form-control"  required />
        </div>
        <div class="form-group">
            <label for="maNxb">Mã nhà xuất bản</label>
            <input id="maNxb" class="maNxb form-control"  required>
         
            </select>
        </div>
        <div class="form-group">
            <label for="maChuDe">Mã chủ đề</label>
            <input type="text" id="maChuDe" class="maChuDe form-control"  required />
        </div>
    </form>
`;


        var dialog_dangky = $.confirm({
            title: "Thêm sách",
            content: contentthemsach,
            buttons: {
                formSubmit: {
                    text: 'Thêm sách',
                    btnClass: 'btn-blue',
                    action: function () {
                        var data_gui_di = {
                            action: 'ThemSach',

                            TenSach: $('#tenSach').val(),
                            GiaBan: $('#giaBan').val(),
                            MoTa: $('#moTa').val(),
                            AnhBia: $('#anhBia').val(),
                            NgayCapNhat: $('#ngayCapNhat').val(),
                            SoLuongTon: $('#soLuongTon').val(),
                            MaNXB: $('#maNxb').val(),
                            MaChuDe: $('#maChuDe').val(),
                        }


                        console.log(data_gui_di);
                        const apiURL = 'api_tacgia.aspx';
                        $.post(apiURL, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                $.confirm({
                                    title: 'THÊM SÁCH THÀNH CÔNG ',
                                    content: 'OK BẠN ƠI !!!!! '
                                });
                            } else {
                                alert('lỗi')
                            }
                        })
                    }
                },
                Hủy: function () {
                    // Đóng hộp thoại nếu người dùng nhấn "Hủy"
                }
            }
        });
    });

    $(".themtacgia").click(function () {

        var contentthemsach = `
    <form>
       
        <div class="form-group">
            <label for="tenTacGia">Tên tác giả</label>
            <input type="text" id="tenTacGia" class="tenTacGia form-control"  required />
        </div>
        <div class="form-group">
            <label for="tieuSu">Tiểu sử</label>
            <input type="text" id="tieuSu" class="tieuSu form-control" values =  required />
        </div>
        <div class="form-group">
            <label for="diaChi">Địa chỉ</label>
            <input type="text" id="diaChi" class="diaChi form-control"  required />
        </div>
        <div class="form-group">
            <label for="dienThoai">Điện thoại</label>
            <input type="text" id="dienThoai" class="dienThoai form-control"  required />
        </div>
        
    </form>
`;


        var dialog_dangky = $.confirm({
            title: "Thêm tác giả",
            content: contentthemsach,
            buttons: {
                formSubmit: {
                    text: 'Thêm tác giả',
                    btnClass: 'btn-blue',
                    action: function () {
                        var data_gui_di = {
                            action: 'ThemTacGia',

                            tentacgia: $('#tenTacGia').val(),
                            tieusu: $('#tieuSu').val(),
                            diachi: $('#diaChi').val(),
                            dienthoai: $('#dienThoai').val(),
                           
                        }


                        console.log(data_gui_di);
                        const apiURL = 'api_tacgia.aspx';
                        $.post(apiURL, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                $.confirm({
                                    title: 'THÊM SÁCH THÀNH CÔNG ',
                                    content: 'OK BẠN ƠI !!!!! '
                                });
                            } else {
                                alert('lỗi')
                            }
                        })
                    }
                },
                Hủy: function () {
                    // Đóng hộp thoại nếu người dùng nhấn "Hủy"
                }
            }
        });
    });

    $(".themtaikhoan").click(function () {

        var contentdangky = `
    <form>
       
        <div class="form-group">
            <label for="hoTen">Họ và tên</label>
            <input type="text" id="hoTen" class="hoTen form-control"  required />
        </div>
        <div class="form-group">
            <label for="taiKhoan">Tài khoản</label>
            <input type="text" id="taiKhoan" class="taiKhoan form-control" values =  required />
        </div>
        <div class="form-group">
            <label for="matKhau">Mật khẩu</label>
            <input type="password" id="matKhau" class="matKhau form-control"  required />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="email form-control"  required />
        </div>
        <div class="form-group">
            <label for="diaChi">Địa chỉ</label>
            <input type="text" id="diaChi" class="diaChi form-control"  required />
        </div>
        <div class="form-group">
            <label for="dienThoai">Điện thoại</label>
            <input type="text" id="dienThoai" class="dienThoai form-control"  required />
        </div>
        <div class="form-group">
            <label for="gioiTinh">Giới tính</label>
            <input id="gioiTinh" class="gioiTinh form-control"  required>
         
            </select>
        </div>
        <div class="form-group">
            <label for="ngaySinh">Ngày sinh</label>
            <input type="date" id="ngaySinh" class="ngaySinh form-control"  required />
        </div>
    </form>
`;


        var dialog_dangky = $.confirm({
            title: "THÊM TÀI KHOẢN",
            content: contentdangky,
            buttons: {
                formSubmit: {
                    text: 'Thêm',
                    btnClass: 'btn-blue',
                    action: function () {
                        var data_gui_di = {
                            action: 'ThemKhachHang',

                            HoTen: $('#hoTen').val(),
                            TaiKhoan: $('#taiKhoan').val(),
                            MatKhau: $('#matKhau').val(),
                            Email: $('#email').val(),
                            DiaChi: $('#diaChi').val(),
                            DienThoai: $('#dienThoai').val(),
                            GioiTinh: $('#gioiTinh').val(),
                            NgaySinh: $('#ngaySinh').val(),
                        }


                        console.log(data_gui_di);
                        const apiURL = 'api_tacgia.aspx';
                        $.post(apiURL, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                $.confirm({
                                    title: 'THÊM TÀI KHOẢN THÀNH CÔNG',
                                    content:    ' '
                                });
                            } else {
                                alert(json.msg)
                            }
                        })
                    }
                },
                Hủy: function () {
                    // Đóng hộp thoại nếu người dùng nhấn "Hủy"
                }
            }
        });
    });

    $("#btn_dangky").click(function () {
      
        var contentdangky = `
    <form>
       
        <div class="form-group">
            <label for="hoTen">Họ và tên</label>
            <input type="text" id="hoTen" class="hoTen form-control"  required />
        </div>
        <div class="form-group">
            <label for="taiKhoan">Tài khoản</label>
            <input type="text" id="taiKhoan" class="taiKhoan form-control" values =  required />
        </div>
        <div class="form-group">
            <label for="matKhau">Mật khẩu</label>
            <input type="password" id="matKhau" class="matKhau form-control"  required />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="email form-control"  required />
        </div>
        <div class="form-group">
            <label for="diaChi">Địa chỉ</label>
            <input type="text" id="diaChi" class="diaChi form-control"  required />
        </div>
        <div class="form-group">
            <label for="dienThoai">Điện thoại</label>
            <input type="text" id="dienThoai" class="dienThoai form-control"  required />
        </div>
        <div class="form-group">
            <label for="gioiTinh">Giới tính</label>
            <input id="gioiTinh" class="gioiTinh form-control"  required>
         
            </select>
        </div>
        <div class="form-group">
            <label for="ngaySinh">Ngày sinh</label>
            <input type="date" id="ngaySinh" class="ngaySinh form-control"  required />
        </div>
    </form>
`;


       var dialog_dangky = $.confirm({
           title: "Đăng ký",
           content: contentdangky,
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-blue',
                    action: function () {
                        var data_gui_di = {
                            action: 'ThemKhachHang',
                          
                            HoTen: $('#hoTen').val(),
                            TaiKhoan: $('#taiKhoan').val(),
                            MatKhau: $('#matKhau').val(),
                            Email: $('#email').val(),
                            DiaChi: $('#diaChi').val(),
                            DienThoai: $('#dienThoai').val(),
                            GioiTinh: $('#gioiTinh').val(),
                            NgaySinh: $('#ngaySinh').val(),
                        }


                        console.log(data_gui_di);
                        const apiURL = 'api_tacgia.aspx';
                        $.post(apiURL , data_gui_di, function (data) {
                            var json = JSON.parse(data);
                            if (json.ok) {
                                $.confirm({
                                    title: 'ĐĂNG KÍ THÀNH CÔNG ',
                                    content : 'Mau đăng nhập để mua sách thôi '
                                });
                            } else {
                                alert(json.msg)
                            }
                        })
                    }
                },
                Hủy: function () {
                    // Đóng hộp thoại nếu người dùng nhấn "Hủy"
                }
            }
        });
    });

    // Sự kiện khi nút "Đăng nhập" được bấm
    $("#btn_dangnhap").click(function () {
        $.confirm({
            title: "Đăng nhập",
            content: '' +
                '<form>' +
                '<div class="form-group">' +
                '<label for="taiKhoan">Tài khoản</label>' +
                '<input type="text" id="taiKhoan" class="taiKhoan form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="matKhau">Mật khẩu</label>' +
                '<input type="password" id="matKhau" class="matKhau form-control" required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Đăng nhập',
                    btnClass: 'btn-blue',
                    action: function () {
                        var data_gui_di = {
                            action: 'DangNhap',
                            TaiKhoan: $('#taiKhoan').val(),
                            MatKhau: $('#matKhau').val(),
                        }



                        console.log(data_gui_di);
                        const apiURL = 'api_tacgia.aspx';

                        
                        

                        $.post(apiURL, data_gui_di, function (data) {
                            var json = JSON.parse(data);
                         
                            if (json.ok == 1) {
                                console.log(data)
                                    if (json.NAME === 'admin') {
                                    $.confirm({
                                        title: 'WELCOME!',
                                        content: 'BẠN ĐÃ ĐĂNG NHẬP VỚI QUYỀN LÀ ADMIN',
                                        onContentReady: function () {
                                            setTimeout(function () {
                                                window.location.href = "quanly.html";
                                            }, 2000); // Chuyển hướng sau 2 giây (có thể thay đổi thời gian chờ)
                                        }
                                    });
                                } else  {
                                    $.confirm({
                                        title: 'THÀNH CÔNG MUA SÁCH THÔI',
                                        content: 'Mua sách thôi',
                                        onContentReady: function () {
                                            setTimeout(function () {
                                                window.location.href = "nguoidung.html";
                                            }, 2000); // Chuyển hướng sau 2 giây (có thể thay đổi thời gian chờ)
                                        }
                                    });
                                }
                            } else {
                                // Hiển thị thông báo lỗi khi đăng nhập không thành công
                                $.alert('Sai tên tài khoản hoặc mật khẩu!');
                            }
                        })
                    }
                },
                Hủy: function () {
                    // Đóng hộp thoại nếu người dùng nhấn "Hủy"
                }
            },
            //onContentReady: function () {
            //    // Tự động focus vào trường tài khoản khi hộp thoại mở
            //    $('#taiKhoan').focus();
            //}
        });
    });

    $("#giohang").click(function () {
        // Thêm xử lý của bạn tại đây, ví dụ: mở trang giỏ hàng hoặc thực hiện các tác vụ khác
        $.confirm({
            title: 'Thông tin giỏ hàng của bạn',
            content: 'Loading.......',

        });
    });

    function list_sach() {
        const apiURL = 'api_tacgia.aspx'; // Đường dẫn đến API của bạn

        // Gọi API để lấy danh sách tác giả
        $.post(apiURL,
            {
                action: "LietKeSach"
            },
            function (data) {
                var json = JSON.parse(data); // chuyển đổi đối tượng json nhận đc thành javascript
                var noidung_sach_html = "";
               
                if (json.ok) {
                    //noidung_sach_html += `<table  class="table table-hover">`
                    //noidung_sach_html += `<thead>
                    //<tr>    
        
                    //<th>      </th>
                    //<th>      </th>
                    //<th>      </th>
                    //<th>      </th>
     
                    //</tr>
                    //</thead>`
                    

                    for (var sach of json.data) {
                        var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaSach}" data-loai = "mua">Mua <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`
                      
                        mua_them += `    <button class=" btn btn-primary nut_mua_them" data-cid="${sach.MaSach}" data-loai = "xoa">Chi tiết  </button>`
                        noidung_sach_html += `
                        <div class="book-container" style="width: 22%;height :380px;  margin: 10px; text-align: center; border: 1px solid #ccc; padding: 10px; display: inline-block; box-sizing: border-box;transition: box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'" onmouseout="this.style.boxShadow='none';">
    <img src="${sach.AnhBia}" alt="Ảnh bìa sách" style="width: 150px; height:  200px; margin-bottom: 10px;">
    <h2 style="font-size: 18px; margin-bottom: 5px;">${sach.TenSach}</h2>
    <p class="book-price" style="font-weight: bold; color: #FF5733;">${sach.GiaBan} VNĐ</p>
   <p>${mua_them}  </p>
  
   
</div>`;

                    }

                    noidung_sach_html += `</table>`
                }
                else {
                    var noidung_sach_html = "Không có dữ liệu ";
                }
                $('#danhmucsach').html(noidung_sach_html);

                console.log(json.data);
                console.log(data);

                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai');
                    var id = $(this).data('cid');

                    if (loai == 'xoa') { // Kiểm tra nút được nhấn có loại là 'xoa' hay không
                        for (var sach2 of json.data) {
                            if (sach2.MaSach == id) {
                                chi_tiet(sach2);   // Gọi hàm xoa_sach khi nút "Xóa" được nhấn
                                break;
                            }
                        }
                    } else {
                        for (var sach2 of json.data) {
                            if (sach2.MaSach == id) {
                                mua_sach(sach2);
                                break;
                            }
                        }
                    }
                });



            });

        function chi_tiet(sach22){
            $.post(apiURL, {
                action: "LietKeChuDe" // Sử dụng action "LietKeChuDe" cho chủ đề
            }, function (data) {
                var json = JSON.parse(data);
                var noidung_chude_html = "";
                if (json.ok) {

                    var noidung_chude_html = '<div class="list-group" style="display: flex; flex-direction: column;">';

                    for (var chude of json.data) {
                       
                        var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach22.MaSach}" data-loai = "mua">Mua <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`
                        mua_them += `   <button class=" btn btn-success nut_quay_lai" data-cid="${sach22.MaSach}" data-loai = "quaylai"> Quay lại <i class="fa-solid fa-rotate-left" style="color: #ffffff;"></i></button>`
                        noidung_chude_html = `
           <div style="display: flex; align-items: center; justify-content: center;">
    <div style="margin-right: 20px;">
        <img style="width: 200px; height: 300px;" src="${sach22.AnhBia}" alt="${sach22.TenSach}">
    </div>
    <div style="text-align: left;">
        <p class="h2" style="font-weight: bold;">Tên sách: ${sach22.TenSach}</p>
        <p style="font-weight: bold; color: #007bff; font-size: 18px;">Giá bán: ${sach22.GiaBan}vnđ</p>
        <p>Ngày cập nhật: ${sach22.NgayCapNhat}</p>
        <p>Mô tả: ${sach22.MoTa}</p>
        <p>Số lượng trong kho : ${sach22.SoLuongTon} quyển</p>
        <p>${mua_them}</p>
        <!-- Thêm các thông tin sách khác vào đây -->
    </div>
</div>
`;
                    }

                  
                } else {
                    noidung_chude_html = "Không có dữ liệu";
                }
                $('#danhmucsach').html(noidung_chude_html);

                $('.nut_quay_lai').click(function () {

                    window.location.href = 'nguoidung.html';
                }
                );
            });
          

            
        }


        function dat_hang(sach22, data) {
           
          

        
        }
        function mua_sach(sach22) {
            var thongtin_sach_html = "";
            $.confirm({
                title: '',
                content: thongtin_sach_html += `
                <div style="display: flex; align-items: center; justify-content: center;">
            <div style="margin-right: 20px;">
                <img style = " width = 300px; height=400px;"src="${sach22.AnhBia}" alt="${sach22.TenSach}" >
            </div>
            <div style="text-align: left;">
                <p class="h2" style = "font-weight: bold;"" >Tên sách: ${sach22.TenSach}</p>
                <p style=" font-weight: bold;  color: #007bff; font-size: 18px; ">Giá bán: ${sach22.GiaBan}vnđ</p>
                <p>Ngày cập nhật: ${sach22.NgayCapNhat}</p>
                <p>Mô tả: ${sach22.MoTa}</p>
                <p>Số lượng trong kho : ${sach22.SoLuongTon} quyển </p>
                <!-- Thêm các thông tin sách khác vào đây -->
            </div>
        </div>`,
                buttons: {
                    mua: {
                        text: 'Mua',
                        btnClass: 'btn-green',

                        
                        action: function () {
                            $.confirm({
                                titele: 'dsfsd',
                                content: dat_hang
                            });
                        }
                    },
                    huy: {
                        text: 'Hủy',
                        btnClass: 'btn-red',
                        action: function () {
                            // Xử lý khi nhấn nút "Hủy"
                        }
                    }
                    
                },
                columnClass: 'xxlarge'
            });
        }

    }
    list_sach();

    function list_chude() {
        const apiURL = 'api_tacgia.aspx'; // Đường dẫn đến API của bạn

        // Gọi API để lấy danh sách chủ đề
        $.post(apiURL, {
            action: "LietKeChuDe" // Sử dụng action "LietKeChuDe" cho chủ đề
       }, function (data) {
            var json = JSON.parse(data);
            var noidung_chude_html = "";
            if (json.ok) {
              
                var noidung_sach_html = '<div class="list-group" style="display: flex; flex-direction: column;">';

                for (var chude of json.data) {
                    noidung_chude_html += `
     <div class="list-group-item" style="border: 1px solid #ccc; border-radius: 40px; margin: 5px; padding: 10px; width: 370px; transition: box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'" onmouseout="this.style.boxShadow='none'">
            <a href="link-to-book" style="text-decoration: none; color: white; font-weight: bold;"> <i class="fa-solid fa-arrow-right fa-rotate-180 fa-sm" style="color: #ffffff;"></i>   ${chude.TenChuDe}</a>
        </div>`;
                }
  
                noidung_chude_html += `</table>`;
            } else {
                noidung_chude_html = "Không có dữ liệu";
            }
            $('#danhmucchude').html(noidung_chude_html);
        });

    }
    // Gọi hàm list_chude() để lấy dữ liệu chủ đề từ API
    list_chude();

    function list_tacgia() {
        const apiURL = 'api_tacgia.aspx'; // Đường dẫn đến API của bạn



        $.post(apiURL, {
            action: "LietKeTacGia" 
        }, function (data) {
            var json = JSON.parse(data);
            var noidung_tacgia_html = "";
            if (json.ok) {
            



                for (var tacgia of json.data) {
                    noidung_tacgia_html += `
    <div class="list-group-item" style="border: 1px solid #ccc; border-radius: 40px; margin: 5px; padding: 10px; width: 370px; transition: box-shadow 0.3s;" onmouseover="this.style.boxShadow='0 0 10px rgba(0, 0, 0, 0.5)'" onmouseout="this.style.boxShadow='none'">
            <a href="link-to-book" style="text-decoration: none; color: white; font-weight: bold;"> <i class="fa-solid fa-arrow-right fa-rotate-180 fa-sm" style="color: #ffffff;"></i>   ${tacgia.tentacgia}</a>
        </div>`;
                }

                noidung_tacgia_html += `</table>`;
            } else {
                noidung_tacgia_html = "Không có dữ liệu";
            }
            $('#danhmuctacgia').html(noidung_tacgia_html);
        });
    }

    // Gọi hàm list_chude() để lấy dữ liệu chủ đề từ API
    list_tacgia();

});





