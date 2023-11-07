



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
                action: "LietKe"
            },
            function (data) {
                var json = JSON.parse(data);
                var noidung_sach_html = "";
                if (json.ok) {
                    noidung_sach_html += `<table  class="table table-hover">`
                    noidung_sach_html += `<thead>
        <tr>    
        <th>stt</th>
        <th>Tên sách</th>
        <th>Ảnh</th>
        <th>Giá Bán</th>
        <th>      </th>
     
        </tr>
        </thead>`
                    var stt = 0;

                    for (var sach of json.data) {
                        var mua_them = `<button class=" btn btn-success nut_mua_them" data-cid="${sach.MaSach}" data-loai = "mua">Mua</button>`

                        noidung_sach_html += `
            <tr>
             <th>${++stt}</th>
        <th>${sach.TenSach}</th>
        <th><img src="${sach.AnhBia}" alt="${sach.TenSach}" width="100"></th>
        <th>${sach.GiaBan}</th>
        <th>${mua_them}</th>
       
        </tr>`;

                    }

                    noidung_sach_html += `</table>`
                }
                else {
                    var noidung_sach_html = "Không có dữ liệu ";
                }
                $('#danhmucsach').html(noidung_sach_html);
                $('.nut_mua_them').click(function () {
                    var loai = $(this).data('loai')
                    var id = $(this).data('cid')

                    $.confirm({
                        title: 'Thông tin sách',
                        content: `
        <div>
            <img src="${sach.AnhBia}" alt="${sach.TenSach}" width="200">
            <p>Tên sách: ${sach.TenSach}</p>
            <p>Giá bán: ${sach.GiaBan}vnđ</p>
            <p>Mô tả: ${sach.MoTa}</p>
            <p>Số lượng trong kho ${sach.SoLuongTon} quyển </p>
            <!-- Thêm các thông tin sách khác vào đây -->
        </div>
    `,
                        buttons: {
                            huy: {
                                text: 'Hủy',
                                btnClass: 'btn-red',
                                action: function () {
                                    // Xử lý khi nhấn nút "Hủy"
                                }
                            },
                            mua: {
                                text: 'Mua',
                                btnClass: 'btn-green',
                                action: function () {
                                    // Xử lý khi nhấn nút "Mua"
                                    alert('Đã mua sách: ' + sach.TenSach);
                                }
                            }

                           
                        }
                    });
                });
            });

    }

    list_sach();







});





