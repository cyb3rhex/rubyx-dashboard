package server

import (
	"log"
	"net/http"
	"runtime/debug"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/server/handlers"
	"github.com/aituglo/rubyx/golang/server/write"
	"github.com/julienschmidt/httprouter"
)

func (srv *server) ConfigureRouter() {
	srv.router = httprouter.New()

	// setup error handlers for our router
	srv.router.MethodNotAllowed = write.Error(errors.BadRequestMethod)
	srv.router.NotFound = write.Error(errors.RouteNotFound)
	srv.router.PanicHandler = func(w http.ResponseWriter, r *http.Request, err interface{}) {
		log.Println("Panic on", r.URL.Path)
		debug.PrintStack()
		write.Error(errors.InternalError)(w, r)
	}

	// SESSION
	srv.POST("/session", handlers.Login)
	srv.DELETE("/session", handlers.Logout)

	// RESETS
	srv.POST("/reset", handlers.CreateReset)
	srv.GET("/reset/:code", handlers.DoReset)

	// USER
	srv.POST("/user", handlers.Signup)
	srv.GET("/user", handlers.Whoami)
	srv.POST("/user/verify", handlers.Verify)
	srv.PUT("/user/password", handlers.UpdatePassword)

	// PLATFORMS
	srv.GET("/platform", handlers.GetPlatforms)
	srv.GET("/platform/:id", handlers.GetPlatform)
	srv.POST("/platform", handlers.CreatePlatform)
	srv.PUT("/platform", handlers.UpdatePlatform)
	srv.DELETE("/platform/:id", handlers.DeletePlatform)

	// PROGRAMS
	srv.GET("/program", handlers.GetPrograms)
	srv.GET("/program/id/:id", handlers.GetProgram)
	srv.GET("/program/slug/:name", handlers.GetProgramBySlug)
	srv.POST("/program", handlers.CreateProgram)
	srv.PUT("/program", handlers.UpdateProgram)
	srv.DELETE("/program/id/:id", handlers.DeleteProgram)
	srv.DELETE("/program/slug/:name", handlers.DeleteProgramBySlug)

	// PORT
	srv.GET("/port", handlers.GetPorts)
	srv.GET("/port/:id", handlers.GetPort)
	srv.POST("/port", handlers.CreatePort)
	srv.PUT("/port", handlers.UpdatePort)
	srv.DELETE("/port/:id", handlers.DeletePort)

	// IP
	srv.GET("/ip", handlers.GetIps)
	srv.GET("/ip/:id", handlers.GetIp)
	srv.POST("/ip", handlers.CreateIp)
	srv.PUT("/ip", handlers.UpdateIp)
	srv.DELETE("/ip/:id", handlers.DeleteIp)

	// REVENUE
	srv.GET("/revenue", handlers.GetRevenues)
	srv.GET("/revenue/:id", handlers.GetRevenue)
	srv.POST("/revenue", handlers.CreateRevenue)
	srv.PUT("/revenue", handlers.UpdateRevenue)
	srv.DELETE("/revenue/:id", handlers.DeleteRevenue)

	// ROOTDOMAIN
	srv.GET("/rootdomain", handlers.GetRootDomains)
	srv.GET("/rootdomain/:id", handlers.GetRootDomain)
	srv.POST("/rootdomain", handlers.CreateRootDomain)
	srv.PUT("/rootdomain", handlers.UpdateRootDomain)
	srv.DELETE("/rootdomain/:id", handlers.DeleteRootDomain)

	// SUBDOMAIN
	srv.GET("/subdomain", handlers.GetSubdomains)
	srv.GET("/subdomain/one/:id", handlers.GetSubdomain)
	srv.GET("/subdomain/program/:id", handlers.GetSubdomainByProgram)
	srv.POST("/subdomain", handlers.CreateSubdomain)
	srv.PUT("/subdomain", handlers.UpdateSubdomain)
	srv.DELETE("/subdomain/:id", handlers.DeleteSubdomain)

	// URL
	srv.GET("/url", handlers.GetUrls)
	srv.GET("/url/one/:id", handlers.GetUrl)
	srv.POST("/url", handlers.CreateUrl)
	srv.PUT("/url", handlers.UpdateUrl)
	srv.DELETE("/url/:id", handlers.DeleteUrl)

	// VULNERABILITY
	srv.GET("/vulnerability", handlers.GetVulnerabilities)
	srv.GET("/vulnerability/:id", handlers.GetVulnerability)
	srv.POST("/vulnerability", handlers.CreateVulnerability)
	srv.PUT("/vulnerability", handlers.UpdateVulnerability)
	srv.DELETE("/vulnerability/:id", handlers.DeleteVulnerability)

	// API
	srv.GET("/api", handlers.GetApis)
	srv.GET("/api/:id", handlers.GetApi)
	srv.POST("/api", handlers.CreateApi)
	srv.DELETE("/api/:id", handlers.DeleteApi)
}

// srvHandler is the extended handler function that our API routes use
type srvHandler func(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc

// helpers for easily adding routes
func (srv *server) GET(path string, handler srvHandler) {
	srv.router.HandlerFunc(http.MethodGet, path, srv.wrap(handler))
}
func (srv *server) PUT(path string, handler srvHandler) {
	srv.router.HandlerFunc(http.MethodPut, path, srv.wrap(handler))
}
func (srv *server) POST(path string, handler srvHandler) {
	srv.router.HandlerFunc(http.MethodPost, path, srv.wrap(handler))
}
func (srv *server) DELETE(path string, handler srvHandler) {
	srv.router.HandlerFunc(http.MethodDelete, path, srv.wrap(handler))
}

// wrap does all the middleware together
func (srv *server) wrap(h srvHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// convert our fancy handler to a normal handlerFunc
		fn := withUserAndEnv(srv.env, h, w, r)
		// wrap it with middlewares
		wrapped := lag(csrf(cors(fn)))
		// execute the wrapped handler
		wrapped(w, r)
	}
}
