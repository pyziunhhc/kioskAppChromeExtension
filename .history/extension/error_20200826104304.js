window.onload = function () {
    const button = document.querySelector('button.back')

    button.addEventListener('click', goBackPage)
}

const goBackPage = () => {
    const howMuchTabs = chrome.windows.getAll(res=>{
        if(res.length > 1){
            window.close()
        } else {

        }
    })
}