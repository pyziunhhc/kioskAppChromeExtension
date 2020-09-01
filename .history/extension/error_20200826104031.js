window.onload = function () {
    const button = document.querySelector('button.back')

    button.addEventListener('click', goBackPage)
}

const goBackPage = () => {
    window.history.back()
}