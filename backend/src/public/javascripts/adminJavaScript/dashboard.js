const getAction = (pageTitle, dataTargetId) => {
    setActiveLink()
    setPageTitle(pageTitle)
    updateContent(pageTitle)
    getDataTable(dataTargetId)
}

getAction()