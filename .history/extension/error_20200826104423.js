window.onload = function () {
    const button = document.querySelector('button.back')

    button.addEventListener('click', goBackPage)
}

const goBackPage = () => {
    chrome.windows.getAll(res => {
        console.log(res)
        if (res.length > 1) {
            window.close()
        } else {
            window.history.go(-2)
        }
    })
}