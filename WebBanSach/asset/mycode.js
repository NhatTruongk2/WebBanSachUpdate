
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
                    <th>   Số lượng tồn   </th>
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
                       <th>${sach.SoLuongTon}</th>
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
                thongtintimkiem += `<table  class="table table-hover">`
                thongtintimkiem += `<thead>
                    <tr>    
        
                    <th>      </th>
                    <th>      </th>
                    <th>      </th>
                    <th>      </th>
     
                    </tr>
                    </thead>`
                for (var sach of json.data) {
                    var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaSach}" data-loai = "mua">Mua <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`
                    thongtintimkiem += `
                         <tr>
             
                        <th>${sach.TenSach}</th>
                        <th><img src="${sach.AnhBia}" alt="${sach.TenSach}" width="100"></th>
                        <th style=" font-weight: bold;  color: #007bff; font-size: 18px; ">Giá : ${sach.GiaBan} VNĐ</th>
                        <th>${mua_them}</th>
       
                        </tr>`;
                }

                $('#danhmucsach').html(thongtintimkiem);
                console.log(json.data);
                console.log(data);

             

                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai');
                    var id = $(this).data('cid');




                    for (var sach2 of json.data) {
                        if (sach2.MaSach == id) {
                            mua_sach(sach2);
                            break;
                        }

                    }
                });


            }
           
        });
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
                        var taiKhoan = this.$content.find('.taiKhoan').val();
                        var matKhau = this.$content.find('.matKhau').val();

                        // Gửi yêu cầu POST đến API để xác thực thông tin đăng nhập
                        fetch('api_tacgia.aspx', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ taiKhoan: taiKhoan, matKhau: matKhau })
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Lỗi mạng! Không thể đăng nhập.');
                                }
                                return response.json();
                            })
                            .then(data => {
                                // Xử lý kết quả từ API sau khi đăng nhập
                                console.log(data); // Dữ liệu nhận được từ API sau đăng nhập thành công
                                // Thực hiện các hành động khác sau khi đăng nhập thành công
                            })
                            .catch(error => {
                                // Xử lý lỗi nếu có
                                console.error('Lỗi đăng nhập:', error);
                                alert('lỗi')
                                // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác khi đăng nhập không thành công
                            });
                    }
                },
                Hủy: function () {
                    // Đóng hộp thoại nếu người dùng nhấn "Hủy"
                }
            }
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
                var json = JSON.parse(data);
                var noidung_sach_html = "";
                if (json.ok) {
                    noidung_sach_html += `<table  class="table table-hover">`
                    noidung_sach_html += `<thead>
                    <tr>    
        
                    <th>      </th>
                    <th>      </th>
                    <th>      </th>
                    <th>      </th>
     
                    </tr>
                    </thead>`
                    

                    for (var sach of json.data) {
                        var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaSach}" data-loai = "mua">Mua <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`
                        
                        noidung_sach_html += `
                         <tr>
             
                        <th>${sach.TenSach}</th>
                        <th><img src="${sach.AnhBia}" alt="${sach.TenSach}" width="100"></th>
                        <th style=" font-weight: bold;  color: #007bff; font-size: 18px; ">Giá : ${sach.GiaBan} VNĐ</th>
                        <th>${mua_them}</th>
       
                        </tr>`;

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
                   

                    

                    for (var sach2 of json.data) {
                        if (sach2.MaSach == id) {
                            mua_sach(sach2);
                            break;
                        }
                       
                    }
                });



            });



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
                noidung_chude_html += `<table class="table table-hover">`;
                noidung_chude_html += `<thead>
                
            </thead>`;
             

                for (var chude of json.data) {
                    noidung_chude_html += `
   <div class="list-group">
  <a href="sdfsdff" class="list-group-item">${chude.TenChuDe}</a>
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
                noidung_tacgia_html += `<table class="table table-hover">`;
                noidung_tacgia_html += `<thead>
                
            </thead>`;




                for (var tacgia of json.data) {
                    noidung_tacgia_html += `
  <div class="list-group">
    <a href="#" class="list-group-item">${tacgia.tentacgia}</a>

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





