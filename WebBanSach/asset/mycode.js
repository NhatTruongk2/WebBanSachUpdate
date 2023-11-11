
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
                    

                    var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaSach}" data-loai = "mua">Sửa <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></button>`

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




                    for (var sach2 of json.data) {
                        if (sach2.MaSach == id) {
                            sua_sach(sach2);
                            break;
                        }

                    }
                });


            }

        });
        function sua_sach(sach22) {
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
                        text: 'Sửa',
                        btnClass: 'btn-green',


                        action: function () {
                            // Xử lý khi nhấn nút "Mua"
                            alert('Đã mua sách: ' + sach22.TenSach);
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
                columnClass: 'xxlarge'
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





