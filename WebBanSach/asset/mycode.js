$(document).ready(function () {
    $("#quanlysach").click(function () {
        // Tạo một bảng và các dòng
        var table = $("<table>").addClass("table");
        var headerRow = $("<tr>");
        var header1 = $("<th>").text("Header 1");
        var header2 = $("<th>").text("Header 2");
        headerRow.append(header1, header2);
        table.append(headerRow);





        // Hiển thị bảng trong hộp thoại confirm
        $.confirm({
            title: "Dữ liệu và thông tin sách",
            content: table, // Sử dụng bảng là nội dung của hộp thoại
            columnClass: 'large'
        });
    });
});


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
});




$(document).ready(function () {
    $("#giohang").click(function () {
        // Thêm xử lý của bạn tại đây, ví dụ: mở trang giỏ hàng hoặc thực hiện các tác vụ khác
        $.confirm({
            title: 'Thông tin giỏ hàng của bạn',
            content: 'Loading.......',
            
        });
    });
});