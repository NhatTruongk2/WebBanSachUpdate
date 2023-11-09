



$(document).ready(function () {
    // Sự kiện khi nút "Đăng ký" được bấm
    $("#btn_dangky").click(function () {
        $.confirm({
            title: "Đăng ký",
            content: '' +
                '<form>' +
                '<div class="form-group">' +
                '<label for="hoTen">Họ và tên</label>' +
                '<input type="text" id="hoTen" class="hoTen form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="taiKhoan">Tài khoản</label>' +
                '<input type="text" id="taiKhoan" class="taiKhoan form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="matKhau">Mật khẩu</label>' +
                '<input type="password" id="matKhau" class="matKhau form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="email">Email</label>' +
                '<input type="email" id="email" class="email form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="diaChi">Địa chỉ</label>' +
                '<input type="text" id="diaChi" class="diaChi form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="dienThoai">Điện thoại</label>' +
                '<input type="text" id="dienThoai" class="dienThoai form-control" required />' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="gioiTinh">Giới tính</label>' +
                '<select id="gioiTinh" class="gioiTinh form-control" required>' +
                '<option value="Nam">Nam</option>' +
                '<option value="Nữ">Nữ</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="ngaySinh">Ngày sinh</label>' +
                '<input type="date" id="ngaySinh" class="ngaySinh form-control" required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Đăng ký',
                    btnClass: 'btn-blue',
                    action: function () {
                        var hoTen = this.$content.find('.hoTen').val();
                        var taiKhoan = this.$content.find('.taiKhoan').val();
                        var matKhau = this.$content.find('.matKhau').val();
                        var email = this.$content.find('.email').val();
                        var diaChi = this.$content.find('.diaChi').val();
                        var dienThoai = this.$content.find('.dienThoai').val();
                        var gioiTinh = this.$content.find('.gioiTinh').val();
                        var ngaySinh = this.$content.find('.ngaySinh').val();

                        // Thực hiện xử lý đăng ký ở đây
                        alert('Đăng ký thành công: Họ và tên - ' + hoTen + ', Tài khoản - ' + taiKhoan + ', Email - ' + email);
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

                        // Thực hiện xử lý đăng nhập ở đây
                        alert('Đăng nhập thành công: Tài khoản - ' + taiKhoan);
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





