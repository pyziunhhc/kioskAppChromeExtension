class Button {
    constructor(textOnButton = 'Przykładowy napis', attributes = null, value = null, classes = null, event) {
        this.textOnButton = textOnButton;
        this.attributes = attributes;
        this.value = value;
        this.classes = classes;
        this.button = document.createElement('button');
    }
    addClass() {
        if (this.classes) {
            this.classes.forEach(classValue => {
                this.button.classList.add(classValue)
            });
            return true;
        }

    }
    addAttributes() {
        if (this.attributes) {
            this.attributes.forEach(attribute => {
                this.button.setAttribute(attribute.name, attribute.value)
            });
            return true;
        }
    }
    addValue() {
        if (this.value) {
            this.button.value = this.value;
            return true;
        }

    }
    addText() {
        if (this.textOnButton) {
            if (this.textOnButton.includes('&#')) {
                this.button.innerHTML = this.textOnButton;
                return true;
            } else {
                this.button.innerText = this.textOnButton.toUpperCase();
                return true;
            }

        }

    }
}

class Pages {
    constructor(menuContainer, body) {
        this.menuContainer = menuContainer;
        this.body = body;
    }
    createPagesBar() {
        chrome.storage.sync.get('pages', data => {
            if (data.pages.length > 0) {
                data.pages.forEach((element, index) => {
                    const pageButton = new Button(element.name, '', '', ['additional-menu__button'], null);
                    pageButton.addClass()
                    pageButton.addText();

                    pageButton.button.addEventListener('click', (e) => {
                        chrome.storage.sync.get('tabsOptions', (data) => {
                            if (data.tabsOptions.openAt == 'new-tab') {
                                window.open(element.link, '_blank')
                            } else {
                                createLoadingCircle(this.body)
                                window.open(element.link, '_self')
                            }

                        })
                    })
                    this.menuContainer.appendChild(pageButton.button);
                })
            }


        })

    }

}

class PasswordPanel {
    constructor(body) {
        const passwordContainerWrapper = document.createElement('div'),
            passwordContainer = document.createElement('div'),
            passwordInputsContainer = document.createElement('div'),
            headerContainer = document.createElement('div'),
            closeButtonContainer = document.createElement('div'),
            titleContainer = document.createElement('div'),
            passwordInput = document.createElement('input'),
            passwordSubmit = document.createElement('button'),
            closeButton = document.createElement('button'),
            title = document.createElement('h2');
        passwordContainerWrapper.classList.add('password-container__wrapper')
        passwordContainer.classList.add('password__container')
        passwordInputsContainer.classList.add('password-inputs__container')
        headerContainer.classList.add('header__container')
        titleContainer.classList.add('title__container')
        closeButtonContainer.classList.add('close-button__container')
        passwordInput.setAttribute('type', 'password')
        passwordInput.classList.add('password__input')
        passwordSubmit.innerText = 'Wyślij';
        title.innerText = 'Wprowadź hasło'
        closeButton.innerText = 'X';

        passwordInput.addEventListener('keypress', e => {
            const password = passwordInput.value;
            if (e.charCode == 13) {
                if (password == 'itatools') {
                    passwordContainerWrapper.remove();
                    const port = chrome.runtime.connect({
                        name: "options"
                    });
                    port.postMessage({
                        msg: "options"
                    });
                } else {
                    alert('Błędne hasło');
                    passwordContainerWrapper.remove()
                }
            }
        })
        passwordSubmit.addEventListener('click', e => {
            const password = passwordInput.value;
            if (password == 'itatools') {
                passwordContainerWrapper.remove();
                const port = chrome.runtime.connect({
                    name: "options"
                });
                port.postMessage({
                    msg: "options"
                });
            } else {
                alert('Błędne hasło');
                passwordContainerWrapper.remove()
            }
        })
        closeButton.addEventListener('click', e => {
            passwordContainerWrapper.remove();
        })


        passwordInputsContainer.appendChild(passwordInput)
        passwordInputsContainer.appendChild(passwordSubmit)
        titleContainer.appendChild(title)
        headerContainer.appendChild(titleContainer)
        headerContainer.appendChild(closeButton)
        passwordContainer.appendChild(headerContainer)
        passwordContainer.appendChild(passwordInputsContainer)
        passwordContainerWrapper.appendChild(passwordContainer)
        body.appendChild(passwordContainerWrapper)
    }
}
class Watch {
    constructor() {
        this.timer = this.getTime()
    }
    getTime() {
        const date = new Date();
        let hour = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        if (hour < 10) {
            hour = `0${hour}`
        }
        return `${hour}:${minutes}:${seconds}`
    }
    updateTime() {
        this.timer = this.getTime()
        return this.timer
    }
}
class Navigation {
    constructor() {
        this.createBar()

    }
    createBar() {
        const body = document.querySelector('body'),
            menuContainer = document.createElement('div'),
            backButton = new Button('\u2b05', null, null, ['additional-menu__button', 'back'], null), //document.createElement('button'),
            forwardButton = new Button('\u2b95', null, null, ['additional-menu__button', 'forward'], null), //document.createElement('button'),
            refreshButton = new Button('', null, null, ['additional-menu__button', 'refresh'], null), //document.createElement('button'),
            refreshSpan = document.createElement('span'),
            urlInput = document.createElement('input'),
            hideButton = new Button('X', '', null, ['additional-menu__button', 'hide']),
            lockButton = new Button('&#128274;', '', '', ['additional-menu__button', 'lock']),
            optionsButton = new Button('', '', '', ['options'], null), //document.createElement('button'),
            showTabsButton = new Button('\u25b2', null, null, ['show-tabs__button']),
            timerContainer = document.createElement('div'); //document.createElement('button');
        const pages = new Pages(menuContainer, body);
        const timer = new Watch()
        timerContainer.innerHTML = `<p>${timer.getTime()}</p>`
        setInterval(() => {
            timerContainer.innerHTML = `<p>${timer.updateTime()}</p>`
        }, 1000)
        backButton.addClass()
        backButton.addAttributes()
        backButton.addValue()
        backButton.addText()

        optionsButton.addClass()
        optionsButton.addAttributes()
        optionsButton.addValue()
        optionsButton.addText()

        forwardButton.addClass()
        forwardButton.addAttributes()
        forwardButton.addValue()
        forwardButton.addText()

        refreshButton.addClass()
        refreshButton.addAttributes()
        refreshButton.addValue()
        refreshButton.addText()

        showTabsButton.addClass()
        showTabsButton.addAttributes()
        showTabsButton.addValue()
        showTabsButton.addText()

        hideButton.addClass()
        hideButton.addAttributes()
        hideButton.addValue()
        hideButton.addText()

        lockButton.addClass()
        lockButton.addAttributes()
        lockButton.addValue()
        lockButton.addText()

        pages.createPagesBar();


        urlInput.setAttribute('type', 'text');
        urlInput.value = window.location.href;
        refreshSpan.innerText = '\u2b6e';

        optionsButton.button.addEventListener('dblclick', (e) => {
            const passwordPanel = new PasswordPanel(body)


        })
        backButton.button.addEventListener('click', (e) => {
            window.history.back();
        })
        forwardButton.button.addEventListener('click', (e) => {
            window.history.forward();
        })
        refreshButton.button.addEventListener('click', (e) => {
            window.location.reload();
        })
        urlInput.addEventListener('keypress', (e) => {
            if (e.charCode == 13) {
                let url = urlInput.value;
                chrome.storage.sync.get('tabsOptions', (data) => {
                    if (url) {
                        if (url.includes('https://')) {
                            if (data.tabsOptions.openAt == 'new-tab') {
                                window.location.reload();
                                window.open(url, '_blank')
                            } else {
                                createLoadingCircle(body)
                                window.open(url, '_self')
                            }

                        } else {
                            if (data.tabsOptions.openAt == 'new-tab') {
                                window.location.reload();
                                window.open(`https://${url}`, '_blank')
                            } else {
                                createLoadingCircle(body)
                                window.open(`https://${url}`, '_self')
                            }

                        }

                    }

                })


            }
        })
        urlInput.addEventListener('click', (e) => {
            urlInput.select();
        })
        hideButton.button.addEventListener('click', (e) => {
            let isHide = menuContainer.classList.value,
                tabsContainer = document.querySelector('.tabs-container');
            if (isHide.includes('hide')) {
                menuContainer.classList.remove('hide');
                menuContainer.classList.add('show');
                e.target.innerText = 'X'
            } else if (isHide.includes('show')) {
                menuContainer.classList.remove('show');
                menuContainer.classList.add('hide');
                tabsContainer ? tabsContainer.remove() : ''

                e.target.innerText = '\u2630'
            } else {
                menuContainer.classList.remove('show');
                menuContainer.classList.add('hide');
                tabsContainer ? tabsContainer.remove() : ''
                e.target.innerText = '\u2630';
            }
        });
        lockButton.button.addEventListener('click', () => {
            chrome.storage.sync.get('padlockOption', data => {
                const value = data.padlockOption;
                if (value == 'lock') {
                    fetch('http://localhost:3000/lock', {
                        method: 'POST'
                    })
                } else {
                    fetch('http://localhost:3000/logoff', {
                        method: 'POST'
                    })
                }

            })


        })
        showTabsButton.button.addEventListener('click', this.createTabsMenu.bind(null, showTabsButton.button, body))
        urlInput.classList.add('additional-menu__input')
        timerContainer.classList.add('additional-menu-timer__container');
        menuContainer.classList.add('additional-menu')



        chrome.storage.sync.get('barConfiguration', (data) => {
            if (Object.keys(data).length > 0) {
                menuContainer.style.backgroundColor = data.barConfiguration.barBackgroundColor;
                menuContainer.classList.add(data.barConfiguration.barLocation)
            }
        })
        chrome.storage.sync.get('tabsOptions', (data) => {
            if (data.tabsOptions.showTabs) {
                menuContainer.appendChild(showTabsButton.button)
            }

        })
        menuContainer.appendChild(hideButton.button)
        menuContainer.appendChild(backButton.button)
        menuContainer.appendChild(forwardButton.button)
        refreshButton.button.appendChild(refreshSpan)
        menuContainer.appendChild(refreshButton.button)
        menuContainer.appendChild(urlInput);
        menuContainer.appendChild(timerContainer)
        menuContainer.append(lockButton.button)

        body.appendChild(optionsButton.button)
        body.appendChild(menuContainer);
    }
    createTabsMenu(e, body) {
        const isExist = document.querySelector('.tabs-container');
        if (isExist) {
            isExist.remove();
            e.classList.remove('hidden')
            e.classList.add('show')
        } else {
            const tabsContainer = document.createElement('div'),
                tabsList = document.createElement('ul');
            tabsContainer.classList.add('tabs-container')
            chrome.storage.sync.get('barConfiguration', (data) => {
                if (Object.keys(data).length > 0) {
                    if (data.barConfiguration.barBackgroundColor) {
                        tabsContainer.style.backgroundColor = data.barConfiguration.barBackgroundColor;
                    }
                    if (data.barConfiguration.barLocation) {
                        tabsContainer.classList.add(data.barConfiguration.barLocation)
                    }

                }
            })
            e.classList.remove('show');
            e.classList.add('hidden');
            const port = chrome.runtime.connect({
                name: "tabs"
            });
            port.postMessage({
                msg: 'getTabs'
            });

            port.onMessage.addListener(res => {
                res.tabs.forEach(tab => {
                    const tabListElement = document.createElement('li'),
                        closeTab = document.createElement('span');

                    tabListElement.innerText = tab.title;
                    closeTab.innerText = 'X';
                    tabListElement.setAttribute('data-tab-id', tab.id);
                    closeTab.classList.add('close')
                    tabListElement.addEventListener('click', e => {
                        e.stopPropagation()
                        const tabId = e.target.attributes[0].value;
                        port.postMessage({
                            msg: 'changeTab',
                            id: tabId
                        })
                    })
                    closeTab.addEventListener('click', e => {
                        e.stopPropagation();
                        const port = chrome.runtime.connect({
                            name: "tabs"
                        });
                        const tabId = e.target.parentElement.attributes[0].value;
                        port.postMessage({
                            msg: 'getTabs'
                        });
                        port.onMessage.addListener(res => {
                            if (res.tabs.length > 1) {
                                port.postMessage({
                                    msg: 'closeTab',
                                    id: tabId
                                })
                                e.target.parentElement.remove();
                            }
                        })

                    })
                    tabListElement.appendChild(closeTab)
                    tabsList.appendChild(tabListElement);
                });

            });
            tabsContainer.appendChild(tabsList);
            body.appendChild(tabsContainer)
        }
    }

}

const createLoadingCircle = (body) => {
    const circle = document.createElement('img');
    circle.setAttribute('src', 'https://lh3.googleusercontent.com/proxy/Rkw3Zd4nwLG8EVEMLhkFPHI3hryrXN9CE4vibgvO4zDKNNI-qBjpEtMZJSPc9Mrb6wW5Roed3Nv-0-mY3sFef1QAApIqewOcNQjW_cY81ecBp6sil8MIrKox');
    circle.classList.add('loading-circle')
    body.appendChild(circle)
}
const nav = new Navigation();