// Database configuration
let firebaseConfig ={
    apiKey: "AIzaSyD5NqWtdMdVqXwIZnQVOOATgSliQymqU5M",
    authDomain: "final-project-4f3b9.firebaseapp.com",
    projectId: "final-project-4f3b9",
    storageBucket: "final-project-4f3b9.appspot.com",
    messagingSenderId: "558707608906",
    appId: "1:558707608906:web:3f0adbba824a90994085b3",
    measurementId: "G-V0ZF9XSJJ4"
};

// Database connection
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// login function
const login = (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
        // alert('Login succeed')
    }) 
    .catch(error => {
        alert(error.massage)
    })
}

// logout function
const logout = () => {
    document.getElementById('content').innerHTML = ''
    
    firebase.auth().signOut()
    .then(result => {
        console.log('logout message:', result)
    })
    .catch(error => {
        console.log('logout error:' + error.massage)
    });
}

// Handling the DOM (Page content) based on current user status (logged in/ logged out)
firebase.auth().onAuthStateChanged(user => {
    let notLoggedIn = document.getElementById('not-logged-in')
    let LoggedIn = document.getElementById('logged-in')
    
    if (user) { // if the user is logged in
        LoggedIn.style.display ='block'
        notLoggedIn.style.display='none'

        // getting user data
        let docRef = firebase.firestore().collection("user_App").doc(firebase.auth().currentUser.uid);
        docRef.get()
        .then(doc => {
            if (doc.exists) { // if user has data
                document.getElementById('name').innerText = doc.data().Name
                document.getElementById('img').src = doc.data().imageurl
                document.getElementById('welcome').innerText =doc.data().Name
            } else {
                console.log("User has no data!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });

    } else { // if user is logged out
        LoggedIn.style.display ='none'
        notLoggedIn.style.display='flex'
    }
});


const getProducts = () => {
    document.getElementById('content').innerHTML = '' // contentبشيل محتوى ال

    // getting data of current logged user
    db.collection("products").where("uid", "==", firebase.auth().currentUser.uid.toString()).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById('content').innerHTML += 
            `
            <div class="card text-center">
                <div class="card-header">
                  ${doc.data().Name}
                </div>
                <div class="card-body">
                  <img src="${doc.data().imageurl}" width="100px" height="100px"/>
                  <p class="card-text">${doc.data().description ? doc.data().description : 'No description'}</p>
                  <div>$${doc.data().Price}</div>
                </div>
                <div class="card-footer text-muted">
                  <div class="counter">${doc.data().view} Views</div>
                  <div class="counter">${doc.data().Favorite} Favorite</div>
                  <div class="counter">${doc.data().chat} Calls</div>
                </div>
            </div>
            `
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}


const getDashCharts = () => {
    document.getElementById('content').innerHTML = ''

    document.getElementById('content').innerHTML = 
    `
    <div class="linecharts_section">
        <div class="main-card mb-3 cardchart" style="display: inline-block;">
            <div class="card-body"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                <h5 class="card-title titlechart">Products Views</h5>
                <canvas id="lineChart"  style="display: block; width: 100%; height: 225px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>

        <div class="main-card mb-3 cardchart" style="display: inline-block;">
            <div class="card-body"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                <h5 class="card-title titlechart">Products Favorites</h5>
                <canvas id="lineChart2"  style="display: block; width: 100%; height: 225px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>

    <div class="piecharts_section">
        <div class="main-card mb-3 cardchart" style="display: inline-block;">
            <div class="card-body"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                <h5 class="card-title titlechart">Products Views</h5>
                <canvas id="pieChart"  style="display: block; width: 100%; height: 225px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>
    `
    putDashChart()
}

const putDashChart = () => {

    let productViews = {labels:[], data:[]}
    let productFav = {labels:[], data:[]}
    db.collection("products").where("uid", "==", firebase.auth().currentUser.uid.toString()).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            productViews.labels.push(doc.data().Name)
            productViews.data.push(doc.data().view)
            productFav.labels.push(doc.data().Name)
            productFav.data.push(doc.data().Favorite)
        });
        console.log(productViews);

        const ctx1 = document.getElementById('pieChart');
        const pieChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: productViews.labels,
                datasets: [{
                    label: '# of Views',
                    data: productViews.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });



        const ctx2 = document.getElementById('lineChart');
        const lineChart = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: productViews.labels,
                datasets: [{
                    label: '# of Views',
                    data: productViews.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const ctx3 = document.getElementById('lineChart2');
        const lineChart2 = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: productFav.labels,
                datasets: [{
                    label: '# of Favorites',
                    data: productFav.data,
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}


const getMaintCharts = () => {
    document.getElementById('content').innerHTML = ''

    document.getElementById('content').innerHTML = 
    `
    <div class="linecharts_section">
        <div class="main-card mb-3 cardchart" style="display: inline-block;">
            <div class="card-body"><div class="chartjs-size-monitor" style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                <h5 class="card-title titlechart">Maintainance</h5>
                <canvas id="pieChart"  style="display: block; width: 100%; height: 225px;" class="chartjs-render-monitor"></canvas>
            </div>
        </div>
    </div>
    `
    putMaintChart()
}

const putMaintChart = () => {

    let userReview = {labels:[], data:[]}
    let docRef = firebase.firestore().collection("user_App").doc(firebase.auth().currentUser.uid);
    docRef.get()
    .then(doc => {
        userReview.labels.push('Good')
        userReview.data.push(doc.data().good)
        userReview.labels.push('Bad')
        userReview.data.push(doc.data().bad)

        const ctx1 = document.getElementById('pieChart');
        const pieChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: userReview.labels,
                datasets: [{
                    label: '# of Reviews',
                    data: userReview.data,
                    backgroundColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(err => console.log(err))
}







// function updateUser(event){
//     event.preventDefault()
//     let firstname = document.getElementById('lastname').value
//     let lastname = document.getElementById('fristname').value
//     let age = document.getElementById('age').value

//     let userRef = firebase.firestore().collection('user_App').doc(firebase.auth().currentUser.uid);

//     let setWithMerge = userRef.set({
//         firstname: firstname,
//         lastname: lastname,
//         age:age,
// }, { merge: true });
// }
