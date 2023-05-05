// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0

package db

import (
	"context"
)

type Querier interface {
	AddSetting(ctx context.Context, arg AddSettingParams) (Setting, error)
	CountSubdomains(ctx context.Context) (int64, error)
	CountUrlsBySubdomain(ctx context.Context, subdomain string) (int64, error)
	CountVulnerabilities(ctx context.Context) (int64, error)
	CreateApi(ctx context.Context, arg CreateApiParams) (Api, error)
	CreateNote(ctx context.Context, arg CreateNoteParams) (Note, error)
	CreatePlatform(ctx context.Context, arg CreatePlatformParams) (Platform, error)
	CreateProgram(ctx context.Context, arg CreateProgramParams) (Program, error)
	CreateReset(ctx context.Context, arg CreateResetParams) (Reset, error)
	CreateScan(ctx context.Context, arg CreateScanParams) (Scan, error)
	CreateScope(ctx context.Context, arg CreateScopeParams) (Scope, error)
	CreateStat(ctx context.Context, arg CreateStatParams) (Stat, error)
	CreateSubdomain(ctx context.Context, arg CreateSubdomainParams) (Subdomain, error)
	CreateUrl(ctx context.Context, arg CreateUrlParams) (Url, error)
	CreateUser(ctx context.Context, arg CreateUserParams) (User, error)
	CreateVulnerability(ctx context.Context, arg CreateVulnerabilityParams) (Vulnerability, error)
	DeleteApiByIDs(ctx context.Context, id int64) error
	DeleteNote(ctx context.Context, id int64) error
	DeletePlatformByIDs(ctx context.Context, id int64) error
	DeleteProgramByIDs(ctx context.Context, id int64) error
	DeleteProgramBySlug(ctx context.Context, slug string) error
	DeleteResetsForUser(ctx context.Context, userID int64) error
	DeleteScanByIDs(ctx context.Context, id string) error
	DeleteScopeByID(ctx context.Context, id int64) error
	DeleteStatByID(ctx context.Context, id int64) error
	DeleteSubdomainByIDs(ctx context.Context, id int64) error
	DeleteUrlByIDs(ctx context.Context, id int64) error
	DeleteVulnerabilityByIDs(ctx context.Context, id int64) error
	FindApiByIDs(ctx context.Context, id int64) (Api, error)
	FindApis(ctx context.Context) ([]Api, error)
	FindNoteByID(ctx context.Context, id int64) (Note, error)
	FindNotes(ctx context.Context) ([]Note, error)
	FindNotesByProgramID(ctx context.Context, programID int64) ([]Note, error)
	FindPlatformByIDs(ctx context.Context, id int64) (FindPlatformByIDsRow, error)
	FindPlatforms(ctx context.Context) ([]FindPlatformsRow, error)
	FindProgramByIDs(ctx context.Context, id int64) (Program, error)
	FindProgramByScope(ctx context.Context, scope string) (int64, error)
	FindProgramBySlug(ctx context.Context, slug string) (Program, error)
	FindPrograms(ctx context.Context) ([]Program, error)
	FindResetByCode(ctx context.Context, code string) (Reset, error)
	FindScanByID(ctx context.Context, id string) (Scan, error)
	FindScans(ctx context.Context) ([]Scan, error)
	FindScopeByID(ctx context.Context, id int64) (Scope, error)
	FindScopes(ctx context.Context) ([]Scope, error)
	FindScopesByProgramID(ctx context.Context, programID int64) ([]Scope, error)
	FindStatByID(ctx context.Context, id int64) (Stat, error)
	FindStatByReportID(ctx context.Context, reportID string) (Stat, error)
	FindStats(ctx context.Context) ([]Stat, error)
	FindSubdomainByIDs(ctx context.Context, id int64) (Subdomain, error)
	FindSubdomainByProgram(ctx context.Context, programID int64) ([]Subdomain, error)
	FindSubdomains(ctx context.Context, arg FindSubdomainsParams) ([]Subdomain, error)
	FindUrlByIDs(ctx context.Context, id int64) (Url, error)
	FindUrls(ctx context.Context) ([]Url, error)
	FindUrlsBySubdomain(ctx context.Context, arg FindUrlsBySubdomainParams) ([]Url, error)
	FindUserByEmail(ctx context.Context, lower string) (User, error)
	FindUserByID(ctx context.Context, id int64) (User, error)
	FindVulnerabilityByIDs(ctx context.Context, id int64) (Vulnerability, error)
	FindVulnerabilitys(ctx context.Context, arg FindVulnerabilitysParams) ([]Vulnerability, error)
	GetPlatforms(ctx context.Context) ([]Platform, error)
	GetScopeByProgramIDAndScope(ctx context.Context, arg GetScopeByProgramIDAndScopeParams) (Scope, error)
	GetSettingByKey(ctx context.Context, key string) (Setting, error)
	GetSettings(ctx context.Context) ([]Setting, error)
	UpdateNote(ctx context.Context, arg UpdateNoteParams) (Note, error)
	UpdatePlatform(ctx context.Context, arg UpdatePlatformParams) (Platform, error)
	UpdateProgram(ctx context.Context, arg UpdateProgramParams) (Program, error)
	UpdateScan(ctx context.Context, arg UpdateScanParams) (Scan, error)
	UpdateSetting(ctx context.Context, arg UpdateSettingParams) (Setting, error)
	UpdateStat(ctx context.Context, arg UpdateStatParams) (Stat, error)
	UpdateSubdomain(ctx context.Context, arg UpdateSubdomainParams) (Subdomain, error)
	UpdateUrl(ctx context.Context, arg UpdateUrlParams) (Url, error)
	UpdateUserEmail(ctx context.Context, arg UpdateUserEmailParams) error
	UpdateUserPassword(ctx context.Context, arg UpdateUserPasswordParams) error
	UpdateVulnerability(ctx context.Context, arg UpdateVulnerabilityParams) (Vulnerability, error)
}

var _ Querier = (*Queries)(nil)
