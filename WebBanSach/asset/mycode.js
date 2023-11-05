$(document).ready(function () {
    const api='/api.aspx'
    $("#quanlysach").click(function () {
        $.confirm({
            title: "Quản lý sách ",
            content: "gsdfgsf",
            columnClass: 'large',


            onContentReady: function () {
               
            $.post(api,
                {
                    action: 'Delete'
                }, function (data) {
                    alert(data)
                }          )
            }
        });
    });
});

