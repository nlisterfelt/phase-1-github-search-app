document.addEventListener('DOMContentLoaded',()=>{
    submitName()
})

function submitName(){
    const inputForm = document.getElementById('github-form')
    inputForm.addEventListener('submit',e=>{
        e.preventDefault()
        document.getElementById('user-list').innerText = ''
        const searchResults = e.target.search.value
        fetch(`https://api.github.com/search/users?q=${searchResults}`)
        .then(resp => resp.json())
        .then(data => {
            for(let i =0; i<10; i++){
                displayNames(data.items[i])
            }
        })
    })
}

function displayNames(name){
    const userLI = document.createElement('li')
    
    const userChildLI = document.createElement('li')
    userChildLI.innerText = name.login
    userChildLI.addEventListener('click',e=>repositoryList(e))

    const userChildLI2 = document.createElement('li')
    const userChildLI3 = document.createElement('li')


    const userProfile = document.createElement('a')
    userProfile.href = name.html_url
    userProfile.innerText = name.html_url
    userChildLI2.appendChild(userProfile)

    const userAvatar = document.createElement('img')
    userAvatar.src = name.avatar_url
    userChildLI3.appendChild(userAvatar)
    
    userLI.appendChild(userChildLI)
    userLI.appendChild(userChildLI2)
    userLI.appendChild(userChildLI3)
    document.getElementById('user-list').appendChild(userLI)
}

function repositoryList(event){
    const user = event.target.innerText
    console.log(user)
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(resp=>resp.json())
    .then(data=>displayRepos(data))
}

function displayRepos(data){
    const reposList = document.getElementById('repos-list')
    reposList.innerText = ''
    
    for(let i = 0; i<data.length; i++){
        const repoLI = document.createElement('li')
        const repoA = document.createElement('a') 
        repoA.innerText = data[i].html_url
        repoA.href = data[i].html_url
        repoLI.appendChild(repoA)
        reposList.appendChild(repoLI)
    }
}