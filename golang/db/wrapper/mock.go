// Code generated by MockGen. DO NOT EDIT.
// Source: db/wrapper/wrapper.go

// Package wrapper is a generated GoMock package.
package wrapper

import (
	context "context"
	reflect "reflect"

	db "github.com/aituglo/rubyx/golang/db"
	gomock "github.com/golang/mock/gomock"
)

// MockQuerier is a mock of Querier interface.
type MockQuerier struct {
	ctrl     *gomock.Controller
	recorder *MockQuerierMockRecorder
}

// MockQuerierMockRecorder is the mock recorder for MockQuerier.
type MockQuerierMockRecorder struct {
	mock *MockQuerier
}

// NewMockQuerier creates a new mock instance.
func NewMockQuerier(ctrl *gomock.Controller) *MockQuerier {
	mock := &MockQuerier{ctrl: ctrl}
	mock.recorder = &MockQuerierMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockQuerier) EXPECT() *MockQuerierMockRecorder {
	return m.recorder
}

// CreateApi mocks base method.
func (m *MockQuerier) CreateApi(ctx context.Context, arg db.CreateApiParams) (db.Api, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateApi", ctx, arg)
	ret0, _ := ret[0].(db.Api)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateApi indicates an expected call of CreateApi.
func (mr *MockQuerierMockRecorder) CreateApi(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateApi", reflect.TypeOf((*MockQuerier)(nil).CreateApi), ctx, arg)
}

// CreateIp mocks base method.
func (m *MockQuerier) CreateIp(ctx context.Context, arg db.CreateIpParams) (db.Ip, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateIp", ctx, arg)
	ret0, _ := ret[0].(db.Ip)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateIp indicates an expected call of CreateIp.
func (mr *MockQuerierMockRecorder) CreateIp(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateIp", reflect.TypeOf((*MockQuerier)(nil).CreateIp), ctx, arg)
}

// CreatePlatform mocks base method.
func (m *MockQuerier) CreatePlatform(ctx context.Context, arg db.CreatePlatformParams) (db.Platform, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreatePlatform", ctx, arg)
	ret0, _ := ret[0].(db.Platform)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreatePlatform indicates an expected call of CreatePlatform.
func (mr *MockQuerierMockRecorder) CreatePlatform(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreatePlatform", reflect.TypeOf((*MockQuerier)(nil).CreatePlatform), ctx, arg)
}

// CreatePort mocks base method.
func (m *MockQuerier) CreatePort(ctx context.Context, arg db.CreatePortParams) (db.Port, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreatePort", ctx, arg)
	ret0, _ := ret[0].(db.Port)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreatePort indicates an expected call of CreatePort.
func (mr *MockQuerierMockRecorder) CreatePort(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreatePort", reflect.TypeOf((*MockQuerier)(nil).CreatePort), ctx, arg)
}

// CreateProgram mocks base method.
func (m *MockQuerier) CreateProgram(ctx context.Context, arg db.CreateProgramParams) (db.Program, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateProgram", ctx, arg)
	ret0, _ := ret[0].(db.Program)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateProgram indicates an expected call of CreateProgram.
func (mr *MockQuerierMockRecorder) CreateProgram(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateProgram", reflect.TypeOf((*MockQuerier)(nil).CreateProgram), ctx, arg)
}

// CreateReset mocks base method.
func (m *MockQuerier) CreateReset(ctx context.Context, arg db.CreateResetParams) (db.Reset, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateReset", ctx, arg)
	ret0, _ := ret[0].(db.Reset)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateReset indicates an expected call of CreateReset.
func (mr *MockQuerierMockRecorder) CreateReset(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateReset", reflect.TypeOf((*MockQuerier)(nil).CreateReset), ctx, arg)
}

// CreateRevenue mocks base method.
func (m *MockQuerier) CreateRevenue(ctx context.Context, arg db.CreateRevenueParams) (db.Revenue, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateRevenue", ctx, arg)
	ret0, _ := ret[0].(db.Revenue)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateRevenue indicates an expected call of CreateRevenue.
func (mr *MockQuerierMockRecorder) CreateRevenue(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateRevenue", reflect.TypeOf((*MockQuerier)(nil).CreateRevenue), ctx, arg)
}

// CreateRootDomain mocks base method.
func (m *MockQuerier) CreateRootDomain(ctx context.Context, arg db.CreateRootDomainParams) (db.Rootdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateRootDomain", ctx, arg)
	ret0, _ := ret[0].(db.Rootdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateRootDomain indicates an expected call of CreateRootDomain.
func (mr *MockQuerierMockRecorder) CreateRootDomain(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateRootDomain", reflect.TypeOf((*MockQuerier)(nil).CreateRootDomain), ctx, arg)
}

// CreateSubdomain mocks base method.
func (m *MockQuerier) CreateSubdomain(ctx context.Context, arg db.CreateSubdomainParams) (db.Subdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateSubdomain", ctx, arg)
	ret0, _ := ret[0].(db.Subdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateSubdomain indicates an expected call of CreateSubdomain.
func (mr *MockQuerierMockRecorder) CreateSubdomain(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateSubdomain", reflect.TypeOf((*MockQuerier)(nil).CreateSubdomain), ctx, arg)
}

// CreateUrl mocks base method.
func (m *MockQuerier) CreateUrl(ctx context.Context, arg db.CreateUrlParams) (db.Url, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateUrl", ctx, arg)
	ret0, _ := ret[0].(db.Url)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateUrl indicates an expected call of CreateUrl.
func (mr *MockQuerierMockRecorder) CreateUrl(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateUrl", reflect.TypeOf((*MockQuerier)(nil).CreateUrl), ctx, arg)
}

// CreateUser mocks base method.
func (m *MockQuerier) CreateUser(ctx context.Context, arg db.CreateUserParams) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateUser", ctx, arg)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateUser indicates an expected call of CreateUser.
func (mr *MockQuerierMockRecorder) CreateUser(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateUser", reflect.TypeOf((*MockQuerier)(nil).CreateUser), ctx, arg)
}

// CreateVulnerability mocks base method.
func (m *MockQuerier) CreateVulnerability(ctx context.Context, arg db.CreateVulnerabilityParams) (db.Vulnerability, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "CreateVulnerability", ctx, arg)
	ret0, _ := ret[0].(db.Vulnerability)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CreateVulnerability indicates an expected call of CreateVulnerability.
func (mr *MockQuerierMockRecorder) CreateVulnerability(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CreateVulnerability", reflect.TypeOf((*MockQuerier)(nil).CreateVulnerability), ctx, arg)
}

// DeleteApiByIDs mocks base method.
func (m *MockQuerier) DeleteApiByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteApiByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteApiByIDs indicates an expected call of DeleteApiByIDs.
func (mr *MockQuerierMockRecorder) DeleteApiByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteApiByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteApiByIDs), ctx, id)
}

// DeleteIpByIDs mocks base method.
func (m *MockQuerier) DeleteIpByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteIpByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteIpByIDs indicates an expected call of DeleteIpByIDs.
func (mr *MockQuerierMockRecorder) DeleteIpByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteIpByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteIpByIDs), ctx, id)
}

// DeletePlatformByIDs mocks base method.
func (m *MockQuerier) DeletePlatformByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeletePlatformByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeletePlatformByIDs indicates an expected call of DeletePlatformByIDs.
func (mr *MockQuerierMockRecorder) DeletePlatformByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeletePlatformByIDs", reflect.TypeOf((*MockQuerier)(nil).DeletePlatformByIDs), ctx, id)
}

// DeletePortByIDs mocks base method.
func (m *MockQuerier) DeletePortByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeletePortByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeletePortByIDs indicates an expected call of DeletePortByIDs.
func (mr *MockQuerierMockRecorder) DeletePortByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeletePortByIDs", reflect.TypeOf((*MockQuerier)(nil).DeletePortByIDs), ctx, id)
}

// DeleteProgramByIDs mocks base method.
func (m *MockQuerier) DeleteProgramByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteProgramByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteProgramByIDs indicates an expected call of DeleteProgramByIDs.
func (mr *MockQuerierMockRecorder) DeleteProgramByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteProgramByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteProgramByIDs), ctx, id)
}

// DeleteResetsForUser mocks base method.
func (m *MockQuerier) DeleteResetsForUser(ctx context.Context, userID int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteResetsForUser", ctx, userID)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteResetsForUser indicates an expected call of DeleteResetsForUser.
func (mr *MockQuerierMockRecorder) DeleteResetsForUser(ctx, userID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteResetsForUser", reflect.TypeOf((*MockQuerier)(nil).DeleteResetsForUser), ctx, userID)
}

// DeleteRevenueByIDs mocks base method.
func (m *MockQuerier) DeleteRevenueByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteRevenueByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteRevenueByIDs indicates an expected call of DeleteRevenueByIDs.
func (mr *MockQuerierMockRecorder) DeleteRevenueByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteRevenueByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteRevenueByIDs), ctx, id)
}

// DeleteRootDomainByIDs mocks base method.
func (m *MockQuerier) DeleteRootDomainByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteRootDomainByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteRootDomainByIDs indicates an expected call of DeleteRootDomainByIDs.
func (mr *MockQuerierMockRecorder) DeleteRootDomainByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteRootDomainByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteRootDomainByIDs), ctx, id)
}

// DeleteSubdomainByIDs mocks base method.
func (m *MockQuerier) DeleteSubdomainByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteSubdomainByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteSubdomainByIDs indicates an expected call of DeleteSubdomainByIDs.
func (mr *MockQuerierMockRecorder) DeleteSubdomainByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteSubdomainByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteSubdomainByIDs), ctx, id)
}

// DeleteUrlByIDs mocks base method.
func (m *MockQuerier) DeleteUrlByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteUrlByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteUrlByIDs indicates an expected call of DeleteUrlByIDs.
func (mr *MockQuerierMockRecorder) DeleteUrlByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteUrlByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteUrlByIDs), ctx, id)
}

// DeleteVulnerabilityByIDs mocks base method.
func (m *MockQuerier) DeleteVulnerabilityByIDs(ctx context.Context, id int64) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DeleteVulnerabilityByIDs", ctx, id)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeleteVulnerabilityByIDs indicates an expected call of DeleteVulnerabilityByIDs.
func (mr *MockQuerierMockRecorder) DeleteVulnerabilityByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeleteVulnerabilityByIDs", reflect.TypeOf((*MockQuerier)(nil).DeleteVulnerabilityByIDs), ctx, id)
}

// FindApiByIDs mocks base method.
func (m *MockQuerier) FindApiByIDs(ctx context.Context, id int64) (db.Api, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindApiByIDs", ctx, id)
	ret0, _ := ret[0].(db.Api)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindApiByIDs indicates an expected call of FindApiByIDs.
func (mr *MockQuerierMockRecorder) FindApiByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindApiByIDs", reflect.TypeOf((*MockQuerier)(nil).FindApiByIDs), ctx, id)
}

// FindApis mocks base method.
func (m *MockQuerier) FindApis(ctx context.Context) ([]db.Api, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindApis", ctx)
	ret0, _ := ret[0].([]db.Api)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindApis indicates an expected call of FindApis.
func (mr *MockQuerierMockRecorder) FindApis(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindApis", reflect.TypeOf((*MockQuerier)(nil).FindApis), ctx)
}

// FindIpByIDs mocks base method.
func (m *MockQuerier) FindIpByIDs(ctx context.Context, id int64) (db.Ip, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindIpByIDs", ctx, id)
	ret0, _ := ret[0].(db.Ip)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindIpByIDs indicates an expected call of FindIpByIDs.
func (mr *MockQuerierMockRecorder) FindIpByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindIpByIDs", reflect.TypeOf((*MockQuerier)(nil).FindIpByIDs), ctx, id)
}

// FindIps mocks base method.
func (m *MockQuerier) FindIps(ctx context.Context) ([]db.Ip, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindIps", ctx)
	ret0, _ := ret[0].([]db.Ip)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindIps indicates an expected call of FindIps.
func (mr *MockQuerierMockRecorder) FindIps(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindIps", reflect.TypeOf((*MockQuerier)(nil).FindIps), ctx)
}

// FindPlatformByIDs mocks base method.
func (m *MockQuerier) FindPlatformByIDs(ctx context.Context, id int64) (db.Platform, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindPlatformByIDs", ctx, id)
	ret0, _ := ret[0].(db.Platform)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindPlatformByIDs indicates an expected call of FindPlatformByIDs.
func (mr *MockQuerierMockRecorder) FindPlatformByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindPlatformByIDs", reflect.TypeOf((*MockQuerier)(nil).FindPlatformByIDs), ctx, id)
}

// FindPlatforms mocks base method.
func (m *MockQuerier) FindPlatforms(ctx context.Context) ([]db.Platform, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindPlatforms", ctx)
	ret0, _ := ret[0].([]db.Platform)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindPlatforms indicates an expected call of FindPlatforms.
func (mr *MockQuerierMockRecorder) FindPlatforms(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindPlatforms", reflect.TypeOf((*MockQuerier)(nil).FindPlatforms), ctx)
}

// FindPortByIDs mocks base method.
func (m *MockQuerier) FindPortByIDs(ctx context.Context, id int64) (db.Port, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindPortByIDs", ctx, id)
	ret0, _ := ret[0].(db.Port)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindPortByIDs indicates an expected call of FindPortByIDs.
func (mr *MockQuerierMockRecorder) FindPortByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindPortByIDs", reflect.TypeOf((*MockQuerier)(nil).FindPortByIDs), ctx, id)
}

// FindPorts mocks base method.
func (m *MockQuerier) FindPorts(ctx context.Context) ([]db.Port, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindPorts", ctx)
	ret0, _ := ret[0].([]db.Port)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindPorts indicates an expected call of FindPorts.
func (mr *MockQuerierMockRecorder) FindPorts(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindPorts", reflect.TypeOf((*MockQuerier)(nil).FindPorts), ctx)
}

// FindProgramByIDs mocks base method.
func (m *MockQuerier) FindProgramByIDs(ctx context.Context, id int64) (db.Program, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindProgramByIDs", ctx, id)
	ret0, _ := ret[0].(db.Program)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindProgramByIDs indicates an expected call of FindProgramByIDs.
func (mr *MockQuerierMockRecorder) FindProgramByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindProgramByIDs", reflect.TypeOf((*MockQuerier)(nil).FindProgramByIDs), ctx, id)
}

// FindPrograms mocks base method.
func (m *MockQuerier) FindPrograms(ctx context.Context) ([]db.Program, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindPrograms", ctx)
	ret0, _ := ret[0].([]db.Program)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindPrograms indicates an expected call of FindPrograms.
func (mr *MockQuerierMockRecorder) FindPrograms(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindPrograms", reflect.TypeOf((*MockQuerier)(nil).FindPrograms), ctx)
}

// FindResetByCode mocks base method.
func (m *MockQuerier) FindResetByCode(ctx context.Context, code string) (db.Reset, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindResetByCode", ctx, code)
	ret0, _ := ret[0].(db.Reset)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindResetByCode indicates an expected call of FindResetByCode.
func (mr *MockQuerierMockRecorder) FindResetByCode(ctx, code interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindResetByCode", reflect.TypeOf((*MockQuerier)(nil).FindResetByCode), ctx, code)
}

// FindRevenueByIDs mocks base method.
func (m *MockQuerier) FindRevenueByIDs(ctx context.Context, id int64) (db.Revenue, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindRevenueByIDs", ctx, id)
	ret0, _ := ret[0].(db.Revenue)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindRevenueByIDs indicates an expected call of FindRevenueByIDs.
func (mr *MockQuerierMockRecorder) FindRevenueByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindRevenueByIDs", reflect.TypeOf((*MockQuerier)(nil).FindRevenueByIDs), ctx, id)
}

// FindRevenues mocks base method.
func (m *MockQuerier) FindRevenues(ctx context.Context) ([]db.Revenue, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindRevenues", ctx)
	ret0, _ := ret[0].([]db.Revenue)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindRevenues indicates an expected call of FindRevenues.
func (mr *MockQuerierMockRecorder) FindRevenues(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindRevenues", reflect.TypeOf((*MockQuerier)(nil).FindRevenues), ctx)
}

// FindRootDomainByIDs mocks base method.
func (m *MockQuerier) FindRootDomainByIDs(ctx context.Context, id int64) (db.Rootdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindRootDomainByIDs", ctx, id)
	ret0, _ := ret[0].(db.Rootdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindRootDomainByIDs indicates an expected call of FindRootDomainByIDs.
func (mr *MockQuerierMockRecorder) FindRootDomainByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindRootDomainByIDs", reflect.TypeOf((*MockQuerier)(nil).FindRootDomainByIDs), ctx, id)
}

// FindRootDomains mocks base method.
func (m *MockQuerier) FindRootDomains(ctx context.Context) ([]db.Rootdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindRootDomains", ctx)
	ret0, _ := ret[0].([]db.Rootdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindRootDomains indicates an expected call of FindRootDomains.
func (mr *MockQuerierMockRecorder) FindRootDomains(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindRootDomains", reflect.TypeOf((*MockQuerier)(nil).FindRootDomains), ctx)
}

// FindSubdomainByIDs mocks base method.
func (m *MockQuerier) FindSubdomainByIDs(ctx context.Context, id int64) (db.Subdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindSubdomainByIDs", ctx, id)
	ret0, _ := ret[0].(db.Subdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindSubdomainByIDs indicates an expected call of FindSubdomainByIDs.
func (mr *MockQuerierMockRecorder) FindSubdomainByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindSubdomainByIDs", reflect.TypeOf((*MockQuerier)(nil).FindSubdomainByIDs), ctx, id)
}

// FindSubdomains mocks base method.
func (m *MockQuerier) FindSubdomains(ctx context.Context) ([]db.Subdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindSubdomains", ctx)
	ret0, _ := ret[0].([]db.Subdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindSubdomains indicates an expected call of FindSubdomains.
func (mr *MockQuerierMockRecorder) FindSubdomains(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindSubdomains", reflect.TypeOf((*MockQuerier)(nil).FindSubdomains), ctx)
}

// FindUrlByIDs mocks base method.
func (m *MockQuerier) FindUrlByIDs(ctx context.Context, id int64) (db.Url, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindUrlByIDs", ctx, id)
	ret0, _ := ret[0].(db.Url)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindUrlByIDs indicates an expected call of FindUrlByIDs.
func (mr *MockQuerierMockRecorder) FindUrlByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindUrlByIDs", reflect.TypeOf((*MockQuerier)(nil).FindUrlByIDs), ctx, id)
}

// FindUrls mocks base method.
func (m *MockQuerier) FindUrls(ctx context.Context) ([]db.Url, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindUrls", ctx)
	ret0, _ := ret[0].([]db.Url)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindUrls indicates an expected call of FindUrls.
func (mr *MockQuerierMockRecorder) FindUrls(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindUrls", reflect.TypeOf((*MockQuerier)(nil).FindUrls), ctx)
}

// FindUserByEmail mocks base method.
func (m *MockQuerier) FindUserByEmail(ctx context.Context, lower string) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindUserByEmail", ctx, lower)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindUserByEmail indicates an expected call of FindUserByEmail.
func (mr *MockQuerierMockRecorder) FindUserByEmail(ctx, lower interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindUserByEmail", reflect.TypeOf((*MockQuerier)(nil).FindUserByEmail), ctx, lower)
}

// FindUserByID mocks base method.
func (m *MockQuerier) FindUserByID(ctx context.Context, id int64) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindUserByID", ctx, id)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindUserByID indicates an expected call of FindUserByID.
func (mr *MockQuerierMockRecorder) FindUserByID(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindUserByID", reflect.TypeOf((*MockQuerier)(nil).FindUserByID), ctx, id)
}

// FindUserByVerificationCode mocks base method.
func (m *MockQuerier) FindUserByVerificationCode(ctx context.Context, verification string) (db.User, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindUserByVerificationCode", ctx, verification)
	ret0, _ := ret[0].(db.User)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindUserByVerificationCode indicates an expected call of FindUserByVerificationCode.
func (mr *MockQuerierMockRecorder) FindUserByVerificationCode(ctx, verification interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindUserByVerificationCode", reflect.TypeOf((*MockQuerier)(nil).FindUserByVerificationCode), ctx, verification)
}

// FindVulnerabilityByIDs mocks base method.
func (m *MockQuerier) FindVulnerabilityByIDs(ctx context.Context, id int64) (db.Vulnerability, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindVulnerabilityByIDs", ctx, id)
	ret0, _ := ret[0].(db.Vulnerability)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindVulnerabilityByIDs indicates an expected call of FindVulnerabilityByIDs.
func (mr *MockQuerierMockRecorder) FindVulnerabilityByIDs(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindVulnerabilityByIDs", reflect.TypeOf((*MockQuerier)(nil).FindVulnerabilityByIDs), ctx, id)
}

// FindVulnerabilitys mocks base method.
func (m *MockQuerier) FindVulnerabilitys(ctx context.Context) ([]db.Vulnerability, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindVulnerabilitys", ctx)
	ret0, _ := ret[0].([]db.Vulnerability)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindVulnerabilitys indicates an expected call of FindVulnerabilitys.
func (mr *MockQuerierMockRecorder) FindVulnerabilitys(ctx interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindVulnerabilitys", reflect.TypeOf((*MockQuerier)(nil).FindVulnerabilitys), ctx)
}

// UpdateIp mocks base method.
func (m *MockQuerier) UpdateIp(ctx context.Context, arg db.UpdateIpParams) (db.Ip, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateIp", ctx, arg)
	ret0, _ := ret[0].(db.Ip)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateIp indicates an expected call of UpdateIp.
func (mr *MockQuerierMockRecorder) UpdateIp(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateIp", reflect.TypeOf((*MockQuerier)(nil).UpdateIp), ctx, arg)
}

// UpdatePlatform mocks base method.
func (m *MockQuerier) UpdatePlatform(ctx context.Context, arg db.UpdatePlatformParams) (db.Platform, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdatePlatform", ctx, arg)
	ret0, _ := ret[0].(db.Platform)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdatePlatform indicates an expected call of UpdatePlatform.
func (mr *MockQuerierMockRecorder) UpdatePlatform(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdatePlatform", reflect.TypeOf((*MockQuerier)(nil).UpdatePlatform), ctx, arg)
}

// UpdatePort mocks base method.
func (m *MockQuerier) UpdatePort(ctx context.Context, arg db.UpdatePortParams) (db.Port, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdatePort", ctx, arg)
	ret0, _ := ret[0].(db.Port)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdatePort indicates an expected call of UpdatePort.
func (mr *MockQuerierMockRecorder) UpdatePort(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdatePort", reflect.TypeOf((*MockQuerier)(nil).UpdatePort), ctx, arg)
}

// UpdateProgram mocks base method.
func (m *MockQuerier) UpdateProgram(ctx context.Context, arg db.UpdateProgramParams) (db.Program, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateProgram", ctx, arg)
	ret0, _ := ret[0].(db.Program)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateProgram indicates an expected call of UpdateProgram.
func (mr *MockQuerierMockRecorder) UpdateProgram(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateProgram", reflect.TypeOf((*MockQuerier)(nil).UpdateProgram), ctx, arg)
}

// UpdateRevenue mocks base method.
func (m *MockQuerier) UpdateRevenue(ctx context.Context, arg db.UpdateRevenueParams) (db.Revenue, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateRevenue", ctx, arg)
	ret0, _ := ret[0].(db.Revenue)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateRevenue indicates an expected call of UpdateRevenue.
func (mr *MockQuerierMockRecorder) UpdateRevenue(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateRevenue", reflect.TypeOf((*MockQuerier)(nil).UpdateRevenue), ctx, arg)
}

// UpdateRootDomain mocks base method.
func (m *MockQuerier) UpdateRootDomain(ctx context.Context, arg db.UpdateRootDomainParams) (db.Rootdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateRootDomain", ctx, arg)
	ret0, _ := ret[0].(db.Rootdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateRootDomain indicates an expected call of UpdateRootDomain.
func (mr *MockQuerierMockRecorder) UpdateRootDomain(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateRootDomain", reflect.TypeOf((*MockQuerier)(nil).UpdateRootDomain), ctx, arg)
}

// UpdateSubdomain mocks base method.
func (m *MockQuerier) UpdateSubdomain(ctx context.Context, arg db.UpdateSubdomainParams) (db.Subdomain, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateSubdomain", ctx, arg)
	ret0, _ := ret[0].(db.Subdomain)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateSubdomain indicates an expected call of UpdateSubdomain.
func (mr *MockQuerierMockRecorder) UpdateSubdomain(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateSubdomain", reflect.TypeOf((*MockQuerier)(nil).UpdateSubdomain), ctx, arg)
}

// UpdateUrl mocks base method.
func (m *MockQuerier) UpdateUrl(ctx context.Context, arg db.UpdateUrlParams) (db.Url, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateUrl", ctx, arg)
	ret0, _ := ret[0].(db.Url)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateUrl indicates an expected call of UpdateUrl.
func (mr *MockQuerierMockRecorder) UpdateUrl(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateUrl", reflect.TypeOf((*MockQuerier)(nil).UpdateUrl), ctx, arg)
}

// UpdateUserPassword mocks base method.
func (m *MockQuerier) UpdateUserPassword(ctx context.Context, arg db.UpdateUserPasswordParams) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateUserPassword", ctx, arg)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateUserPassword indicates an expected call of UpdateUserPassword.
func (mr *MockQuerierMockRecorder) UpdateUserPassword(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateUserPassword", reflect.TypeOf((*MockQuerier)(nil).UpdateUserPassword), ctx, arg)
}

// UpdateUserStatus mocks base method.
func (m *MockQuerier) UpdateUserStatus(ctx context.Context, arg db.UpdateUserStatusParams) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateUserStatus", ctx, arg)
	ret0, _ := ret[0].(error)
	return ret0
}

// UpdateUserStatus indicates an expected call of UpdateUserStatus.
func (mr *MockQuerierMockRecorder) UpdateUserStatus(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateUserStatus", reflect.TypeOf((*MockQuerier)(nil).UpdateUserStatus), ctx, arg)
}

// UpdateVulnerability mocks base method.
func (m *MockQuerier) UpdateVulnerability(ctx context.Context, arg db.UpdateVulnerabilityParams) (db.Vulnerability, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "UpdateVulnerability", ctx, arg)
	ret0, _ := ret[0].(db.Vulnerability)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// UpdateVulnerability indicates an expected call of UpdateVulnerability.
func (mr *MockQuerierMockRecorder) UpdateVulnerability(ctx, arg interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "UpdateVulnerability", reflect.TypeOf((*MockQuerier)(nil).UpdateVulnerability), ctx, arg)
}

// WithTx mocks base method.
func (m *MockQuerier) WithTx(arg0 context.Context, arg1 func(db.Querier) error) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WithTx", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// WithTx indicates an expected call of WithTx.
func (mr *MockQuerierMockRecorder) WithTx(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WithTx", reflect.TypeOf((*MockQuerier)(nil).WithTx), arg0, arg1)
}
