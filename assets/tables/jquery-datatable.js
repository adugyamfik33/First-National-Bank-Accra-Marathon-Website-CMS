$(function () {
    $('.js-basic-example').DataTable({
        responsive: true,
        "lengthMenu": [ 10, 25, 50, 75, 100 ]
    });

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
});