window.onload = function () {
    const button = document.querySelector('button.back');

    button.addEventListener('click', goBackPage)
}

const goBackPage = () => {
    chrome.tabs.getAllInWindow(res => {
        console.log(res)
        if (res.length > 1) {
            window.close()
        } else {
            window.history.go(-2)
        }
    })
}

const animateTheCaption = () => {

    const errorText = document.querySelectorAll('.speech-cloud__text > p > span');
    console.log(errorText)
}