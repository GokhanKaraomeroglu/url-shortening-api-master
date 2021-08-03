let box_count = 0;
function shortenLinks() {

    let request = new XMLHttpRequest(); 
    var input = document.getElementById('input-text').value; 
    request.open("GET", "https://api.shrtco.de/v2/shorten?url=" + input); 
    request.send(); 
        request.onload = () => { 
            if (request.status === 201) { 
            
            const response = JSON.parse(request.responseText)
            const original_link = response.result.original_link;
            const shorten_link = response.result.short_link;

            box_count++;
            const box_title = "api-call-box-" + box_count;
            const box_title_top = "api-call-box-top-" + box_count;
            const box_title_bottom = "api-call-box-bottom-" + box_count;

            //Create the box
            let container = document.createElement('div');
            container.classList.add('api-call-box');
            container.id = box_title;
            document.querySelector(".api-call").appendChild(container);

            //Create the Container Top
            let containerTop = document.createElement('div');
            containerTop.classList.add('api-call-box-top');
            containerTop.id = box_title_top;
            document.getElementById(box_title).appendChild(containerTop);

            //Create the text for the Container Top
            let containerTopTitle = document.createElement('h6');
            var containerTopTitle_Content = document.createTextNode(original_link);
            document.getElementById(box_title_top).appendChild(containerTopTitle);
            containerTopTitle.appendChild(containerTopTitle_Content); 

            //Create the Container Bottom
            let containerBottom = document.createElement('div');
            containerBottom.classList.add('api-call-box-bottom');
            containerBottom.id = box_title_bottom;
            document.getElementById(box_title).appendChild(containerBottom);

            //Create the text for the Container Bottom
            let containerBottomTitle = document.createElement('p');
            var containerBottomTitle_Content = document.createTextNode(shorten_link);
            document.getElementById(box_title_bottom).appendChild(containerBottomTitle);
            containerBottomTitle.appendChild(containerBottomTitle_Content);  
            containerBottomTitle.id = "copy";

            //Create the button
            let containerBottomButton = document.createElement('button')
            var containerBottomButton_Content = document.createTextNode("Copy");
            document.getElementById(box_title_bottom).appendChild(containerBottomButton);
            containerBottomButton.appendChild(containerBottomButton_Content);
            containerBottomButton.id = "btn-copy";

            var button = document.querySelector("#btn-copy");

            button.addEventListener('click', function() {

                navigator.clipboard.writeText(shorten_link);

                button.style.backgroundColor = "hsl(257, 27%, 26%)";
                button.innerHTML = "Copied !";

            });

            } else {
                console.log(`error ${request.status} ${request.statusText}`);
                reject(error);
            }
        }

}

