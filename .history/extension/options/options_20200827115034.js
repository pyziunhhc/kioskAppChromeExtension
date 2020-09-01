function saveNewPage() {
    const link = document.querySelector(`.page-value__input`),
        name = document.querySelector(`.page-name__input`),
        list = document.querySelector(`.added-pages-list__ul`);

    chrome.storage.sync.get('pages', (data) => {
        let pages = data.pages;
        if (pages) {
            let page = {
                link: checkIfItContainsHttps(link.value),
                name: name.value
            }
            pages.push(page)
            chrome.storage.sync.set({
                pages: pages
            }, () => {
                createLink(link, name, list, page)
                link.value = ''
                name.value = ''
            })

        } else {
            let pages = [],
                page = {
                    link: checkIfItContainsHttps(link.value),
                    name: name.value
                };
            pages.push(page)
            chrome.storage.sync.set({
                pages: pages
            }, () => {
                createLink(link, name, list, page);
                link.value = ''
                name.value = ''
            })
        }

    })


}

function createLink(link, name, list) {
    let pageAnchor = document.createElement('a'),
        pageListElement = document.createElement('li'),
        remove = document.createElement('span'),
        page = {
            link: checkIfItContainsHttps(link.value),
            name: name.value
        };

    pageAnchor.setAttribute('href', page.link);

    pageAnchor.innerText = page.name.toUpperCase();
    remove.innerText = 'X'

    remove.addEventListener('click', removePage.bind(this, page))

    pageListElement.appendChild(pageAnchor);
    pageListElement.appendChild(remove)

    list.appendChild(pageListElement)
}

function saveBlockedPage() {
    const link = document.querySelector(`.blocked-page-value__input`),
        list = document.querySelector(`.blocked-pages-list__ul`);

    chrome.storage.sync.get('blockedPages', (data) => {
        let pages = data.pages;
        if (pages) {
            let page = {
                link: checkIfItContainsHttps(link.value),
                name: name.value
            }
            pages.push(page)
            chrome.storage.sync.set({
                pages: pages
            }, () => {
                createLink(link, name, list, page)
            })
        } else {
            let pages = [],
                page = {
                    link: checkIfItContainsHttps(link.value),
                    name: name.value
                };
            pages.push(page)
            chrome.storage.sync.set({
                pages: pages
            }, () => {
                createLink(link, name, list, page);
            })
        }

    })
}

function savePadlockConfiguration() {
    const value = document.querySelector('.padlock-option:checked').value;
    if (value) {
        chrome.storage.sync.get('padlockOption', data => {
            chrome.storage.sync.set({
                "padlockOption": value
            }, () => {
                alert('Zapisano!')
            })
        })
    }
}

function saveBarConfiguration() {
    const barBackgroundColor = document.querySelector(`.bar-background-color__input`),
        barLocation = document.querySelector(`.bar-location`);
    chrome.storage.sync.set({
        'barConfiguration': {
            barBackgroundColor: barBackgroundColor.value,
            barLocation: barLocation.value
        }
    }, () => {
        alert('Zapisano!')
    })
}

function checkIfItContainsHttps(link) {
    if (link.includes('https://')) {
        return link
    } else {
        return `https://${link}`

    }
}



function removePage(toRemove, event) {
    chrome.storage.sync.get('pages', (data) => {
        let updatedPages = data.pages.filter(element => {
            console.log(element.link, toRemove.link)
            return element.link !== toRemove.link
        })
        chrome.storage.sync.set({
            pages: updatedPages
        }, () => {
            event.target.parentElement.remove();
        })
    })
}

function showSavedOptions() {
    const list = document.querySelector(`.added-pages-list__ul`),
        backgroundColor = document.querySelector(`.bar-background-color__input`),
        textColor = document.querySelector(`.bar-text-color__input`),
        location = document.querySelector(`.bar-location`);
    chrome.storage.sync.get('pages', (data) => {
        if (data.pages) {
            data.pages.forEach(element => {
                let pageAnchor = document.createElement('a'),
                    pageListElement = document.createElement('li'),
                    remove = document.createElement('span');
                pageAnchor.setAttribute('href', element.link);

                pageAnchor.innerText = element.name.toUpperCase();
                remove.innerText = 'X'

                remove.addEventListener('click', removePage.bind(this, element))

                pageListElement.appendChild(pageAnchor);
                pageListElement.appendChild(remove)

                list.appendChild(pageListElement)
            });
        }
    })
    chrome.storage.sync.get('barConfiguration', (data) => {
        console.log(data)
        if (data) {
            backgroundColor.value = data.barConfiguration.barBackgroundColor;
            location.value = data.barConfiguration.barLocation
        }
    })
    chrome.storage.sync.get('tabsOptions', (data) => {
        if (data) {
            if (data.tabsOptions.openAt == 'new-tab') {
                document.querySelector('.open-card-option[value="new-tab"]').setAttribute('checked', true)
            } else if (data.tabsOptions.openAt == 'same-tab') {
                document.querySelector('.open-card-option[value="same-tab"]').setAttribute('checked', true)
            } else {
                return false;
            }
        }
    })
    chrome.storage.sync.get('tabsOptions', (data) => {
        if (data) {
            if (data.tabsOptions.showTabs) {
                document.querySelector('.show-card-option[value="show"]').setAttribute('checked', true)
            } else {
                document.querySelector('.show-card-option[value="dont-show"]').setAttribute('checked', true)
            }
        }
    })
    chrome.storage.sync.get('padlockOption', (data) => {
        if (data) {
            if (data.padlockOption == 'lock') {
                document.querySelector('.padlock-option[value="lock"]').setAttribute('checked', true)
            } else {
                document.querySelector('.padlock-option[value="logoff"]').setAttribute('checked', true)
            }
        }
    })
}

function saveOpenAtTabsOption() {
    const value = document.querySelector('.open-card-option:checked').value;
    if (value) {
        chrome.storage.sync.get('tabsOptions', data => {
            chrome.storage.sync.set({
                "tabsOptions": {
                    ...data.tabsOptions,
                    openAt: value
                }
            }, () => {
                alert('Zapisano!')
            })
        })
    }

}

function saveShowTabsOption() {
    const value = document.querySelector('.show-card-option:checked').value;
    if (value == 'show') {
        chrome.storage.sync.get('tabsOptions', data => {
            chrome.storage.sync.set({
                "tabsOptions": {
                    ...data.tabsOptions,
                    showTabs: true
                }
            }, () => {
                alert('Zapisano!')
            })
        })

    } else {
        chrome.storage.sync.get('tabsOptions', data => {
            chrome.storage.sync.set({
                "tabsOptions": {
                    ...data.tabsOptions,
                    showTabs: false
                }
            }, () => {
                alert('Zapisano!')
            })
        })
    }

}
window.onload = function () {
    showSavedOptions()
    document.querySelector('.page-save__button').addEventListener('click', saveNewPage);
    document.querySelector('.page-name__input').addEventListener('keypress', e => {
        if (e.keypress == '13') {
            saveNewPage()
        }
    })
    document.querySelector('.bar-save__button').addEventListener('click', saveBarConfiguration);
    document.querySelector('.open-tabs-save__button').addEventListener('click', saveOpenAtTabsOption);
    document.querySelector('.show-tabs-save__button').addEventListener('click', saveShowTabsOption);
    document.querySelector('.padlock-option-save__button').addEventListener('click', savePadlockConfiguration);
}