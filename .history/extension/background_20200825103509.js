chrome.runtime.onConnect.addListener(port => {
    //console.assert(port.name == "options");
    port.onMessage.addListener(res => {
        if (res.msg == 'options') {
            chrome.windows.create({
                url: chrome.runtime.getURL('options/options.html'),
                type: 'popup'
            })
        }
    });
});

chrome.runtime.onConnect.addListener(port => {
    //console.assert(port.name == 'tabs');
    port.onMessage.addListener(res => {
        switch (res.msg) {
            case 'getTabs': {
                chrome.windows.getAll((win) => {
                    chrome.tabs.query({
                        windowId: win.id
                    }, (tabs) => {
                        port.postMessage({
                            tabs: tabs
                        })
                    })
                })
            }
            break;
        case 'changeTab': {
            const tabId = parseInt(res.id)
            chrome.tabs.update(tabId, {
                active: true
            }, (res) => {
                console.log(res)
            })
        }
        break;
        case 'updateTabs': {
            chrome.tabs.query({

            }, (tabs) => {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, {
                        msg: 'tabs',
                        tabs: tabs,
                        id: tab.id
                    })
                });

            })
        }
        break;
        case 'closeTab': {
            const tabId = parseInt(res.id)
            chrome.tabs.remove(tabId)
        }
        break;
        }
    })
})

chrome.webNavigation.on