let app = {
    init: function () {
        this.addEvents();
    },
    addEvents: function () {
        let loadContent = function () {
            fetch("/materia")
                .then(res => res.json())
                .then(data => {
                    let materias = document.getElementsByClassName("materias")[0];

                    materias.innerHTML = data.reduce((cadena, element) => {
                        return cadena +
                            ` <tr>
                                <td class="name">${element.nombre}</td>
                                <td class="uv">${element.uv}</td>
                                <td class="options"> 
                                    <a class="more" href=""> More</a>
                                    <a class="edit" href=""> Edit </a>
                                    <a class="delete" href=""> Delete </a>
                                </td>
                            </tr>`
                    }, "");

                    document.querySelectorAll(".more").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;
                            fetch('/materia/' + name)
                                .then(res => res.json())
                                .then(function (data) {
                                    alert(data.descripcion);
                                    console.log(data);
                                });
                        });
                    });

                    document.querySelectorAll(".edit").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            
                            


                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;

                                fetch('/materia/' + name, {
                                    method: 'POST',
                                    body: new URLSearchParams(new FormData(form))
                                }).then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    loadContent();
                                });
                        });
                    });

                    document.querySelectorAll(".delete").forEach(element => {
                        element.addEventListener('click', function (evnt) {
                            evnt.preventDefault();
                            let name = this.parentElement // td
                                .parentElement // tr
                                .getElementsByClassName("name")[0]
                                .innerText;
                            let names = this.parentElement // td
                            names.parentElement.parentElement.removeChild(names.parentElement); 
                            fetch('/materia/' + name,{
                                    method: 'delete'
                            })
                                .then(res => res.json())
                                .then(
                                    console.log({state: complete}));
                                       
                        });
                    });

                });
        }
        let form = document.forms.saveMateria;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            fetch(form.action, {
                    method: 'POST',
                    body: new URLSearchParams(new FormData(form))
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    loadContent();
                });
        });

        loadContent();
    }
};
window.onload = () => app.init();