$(document).ready(function () {

    const api='/api.aspx'

    $('#nut').click(function () {
        alert($.post(api,
            {
            action: 'Search'
        },
            funtion(data){
            alert(data)
        }))
    });
});