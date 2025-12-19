/**
 * @typedef {Object} Project
 * @property {string} name
 * @property {number} stargazers_count
 * @property {string} html_url
 * @property {string|null} description
 * @property {string} pushed_at
 * @property {string|null} language
 */

/**
    * This is a function.
    *
    * @param {Project} a - first project
    * @param {Project} b - second project
    * @return {number} Result of the comparison
    */
function compareGithubProjects(a, b) {
    return b.stargazers_count - a.stargazers_count;
}

/**
    * This method renders github projects in a container
    * @param {any} container - container to render in
    */
async function renderGithubProjects(container) {
    const res = await fetch('https://api.github.com/users/jitsem/repos');
    projects = await res.json();
    projects.sort(compareGithubProjects);
    container.innerHTML = `
    				<div class="flex flex-col gap-3 max-w-3xl mx-auto">
    					${projects.map(p => `
    						<a
    							href="${p.html_url}"
    							target="_blank"
    							rel="noreferrer"
    							class="block border rounded-lg shadow-sm
    								border-jitsem-900 dark:border-jitsem-100
    								hover:border-jitsem-100 dark:hover:border-jitsem-900
    								transition"
    						>
    							<div class="p-4 flex flex-col gap-3">

    								<div class="flex justify-between items-start gap-2">
    									<h2 class="text-lg font-semibold text-jitsem-700 dark:text-jitsem-600">
    										${p.name}
    									</h2>
    									<span class="text-sm whitespace-nowrap text-jitsem-700 dark:text-jitsem-600">
    										${p.stargazers_count} ★
    									</span>
    								</div>

    								<p class="text-sm italic text-gray-700 dark:text-gray-300">
    									${p.description ?? 'No description'}
    								</p>

    								<div class="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 pt-2 border-t">
    									<span>${p.language ?? '???'}</span>
    									<span>Updated ${new Date(p.pushed_at).toLocaleDateString()}</span>
    								</div>

    							</div>
    						</a>
    					`).join('')}
    				</div>
    			`;
}

document.addEventListener("DOMContentLoaded", () => {
    let darkMode = true;

    function handleSwitchDarkMode() {
        darkMode = !darkMode;

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        darkMode = true;
    } else {
        document.documentElement.classList.remove("dark");
        darkMode = false;
    }

    document
        .getElementById("theme-toggle")
        .addEventListener("click", handleSwitchDarkMode);
});
