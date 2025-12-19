use askama::Template;
use axum::{
    Router,
    http::StatusCode,
    response::{Html, IntoResponse, Redirect, Response},
    routing::get,
};
use tower_http::services::ServeFile;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    println!("Hello, world!");
    let port = 8000_u16;
    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], port));
    let mut router = Router::new();
    router = router.route("/", get(Redirect::temporary("/about")));
    router = router.route("/about", get(about));
    router = router.route("/playground", get(playground));
    router = router.route("/projects", get(projects));
    router = router.route_service("/css/site.css", ServeFile::new("assets/site.css"));
    router = router.route_service("/scripts/base.js", ServeFile::new("assets/base.js"));
    router = router.route_service(
        "/logos/github.svg",
        ServeFile::new("assets/images/github.svg"),
    );
    router = router.route_service(
        "/logos/linkedin.svg",
        ServeFile::new("assets/images/linkedin.svg"),
    );
    router = router.route_service("/logos/mail.svg", ServeFile::new("assets/images/mail.svg"));
    router = router.route_service(
        "/images/checkmark.svg",
        ServeFile::new("assets/images/checkmark.svg"),
    );
    router = router.route_service(
        "/images/coding1.svg",
        ServeFile::new("assets/images/coding1.svg"),
    );
    router = router.route_service(
        "/images/hacking1.svg",
        ServeFile::new("assets/images/hacking1.svg"),
    );
    router = router.route_service(
        "/images/programming1.svg",
        ServeFile::new("assets/images/programming1.svg"),
    );
    router = router.route_service("/favicon.ico", ServeFile::new("assets/images/favicon.ico"));

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, router).await.unwrap();
    Ok(())
}

async fn playground() -> impl IntoResponse {
    let template = PlaygroundTemplate {};
    HtmlTemplate(template)
}

async fn projects() -> impl IntoResponse {
    let template = ProjectsTemplate {};
    HtmlTemplate(template)
}

async fn about() -> impl IntoResponse {
    let template = AboutTemplate {};
    HtmlTemplate(template)
}

#[derive(Template)]
#[template(path = "about.html")]
struct AboutTemplate;

#[derive(Template)]
#[template(path = "playground.html")]
struct PlaygroundTemplate;

#[derive(Template)]
#[template(path = "projects.html")]
struct ProjectsTemplate;

struct HtmlTemplate<T>(T);
impl<T> IntoResponse for HtmlTemplate<T>
where
    T: Template,
{
    fn into_response(self) -> Response {
        match self.0.render() {
            Ok(html) => Html(html).into_response(),
            Err(err) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to render template. Error: {}", err),
            )
                .into_response(),
        }
    }
}
