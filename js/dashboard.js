const marathon = document.querySelector('#marathon-count'),
civil_service = document.querySelector('#civil-service-count'),
corporate = document.querySelector('#corperate-count'),
juniors = document.querySelector('#juniors-count'),
total = document.querySelector('#total-amount');

function getDashboard(){
    fetch('./endpoints/dashboard/getDashboard.php',{
        method:'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let total_amount = 0;
            let marathon_count = 0, civil_service_count = 0, corporate_count = 0, juniors_count = 0;
            let dashboard = data.data;
            dashboard.forEach(element => {
                switch(element.race_category_id){
                    case 1:
                        marathon_count += 1;
                        if(element.staff_status != '1'){
                            total_amount += 20;
                        }
                        break;
                    case 2:
                        civil_service_count += 1;
                        if(element.staff_status != '1'){
                            total_amount += 20;
                        }
                        break;
                    case 3:
                        corporate_count += 1;
                        if(element.staff_status != '1'){
                            total_amount += 150;
                        }
                        break;
                    case 4:
                        juniors_count += 1;
                        if(element.staff_status != '1'){
                            total_amount += 20;
                        }
                        break;
                    default:
                        console.log('error!');
                        break;
                }

            });
            total.innerHTML = `GH₵ ${total_amount}`;
            marathon.innerHTML = marathon_count;
            civil_service.innerHTML = civil_service_count;
            corporate.innerHTML = corporate_count;
            juniors.innerHTML = juniors_count;
            var xValues = ["Marathon", "Civil Service", "Corporate", "Juniors"];
            var yValues = [marathon_count, civil_service_count, corporate_count, juniors_count];
            var barColors = ["#00A9AC", "green","blue","#FA9D1E"];

            new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                backgroundColor: barColors,
                data: yValues
                }]
            },
            options: {
                legend: {display: false},
                title: {
                display: true,
                text: "Upcoming Race Registration Graph"
                }
            }
        });
        }
        else{
            var xValues = ["Marathon", "Civil Service", "Corporate", "Juniors"];
            var yValues = [239, 421, 164, 78];
            var barColors = ["#00A9AC", "green","blue","#FA9D1E"];

            new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                backgroundColor: barColors,
                data: yValues
                }]
            },
            options: {
                legend: {display: false},
                title: {
                display: true,
                text: "Dummy Data for Upcoming Race Registration Graph"
                }
            }
            });
        }
    })
}
getDashboard();