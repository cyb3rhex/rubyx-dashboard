// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0

package db

import (
	"database/sql/driver"
	"fmt"
	"time"
)

type PlatformType string

const (
	PlatformTypePublic  PlatformType = "public"
	PlatformTypePrivate PlatformType = "private"
)

func (e *PlatformType) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = PlatformType(s)
	case string:
		*e = PlatformType(s)
	default:
		return fmt.Errorf("unsupported scan type for PlatformType: %T", src)
	}
	return nil
}

type NullPlatformType struct {
	PlatformType PlatformType
	Valid        bool // Valid is true if String is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullPlatformType) Scan(value interface{}) error {
	if value == nil {
		ns.PlatformType, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.PlatformType.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullPlatformType) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return ns.PlatformType, nil
}

type ProgramType string

const (
	ProgramTypePublic  ProgramType = "public"
	ProgramTypePrivate ProgramType = "private"
)

func (e *ProgramType) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = ProgramType(s)
	case string:
		*e = ProgramType(s)
	default:
		return fmt.Errorf("unsupported scan type for ProgramType: %T", src)
	}
	return nil
}

type NullProgramType struct {
	ProgramType ProgramType
	Valid       bool // Valid is true if String is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullProgramType) Scan(value interface{}) error {
	if value == nil {
		ns.ProgramType, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.ProgramType.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullProgramType) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return ns.ProgramType, nil
}

type Api struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	ApiKey    string    `json:"api_key"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Note struct {
	ID        int64     `json:"id"`
	Title     string    `json:"title"`
	ProgramID int64     `json:"program_id"`
	Content   string    `json:"content"`
	Favourite bool      `json:"favourite"`
	Tag       string    `json:"tag"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Platform struct {
	ID             int64        `json:"id"`
	Name           string       `json:"name"`
	Slug           string       `json:"slug"`
	Email          string       `json:"email"`
	Password       string       `json:"password"`
	HunterUsername string       `json:"hunter_username"`
	Otp            string       `json:"otp"`
	Jwt            string       `json:"jwt"`
	Type           PlatformType `json:"type"`
	CreatedAt      time.Time    `json:"created_at"`
	UpdatedAt      time.Time    `json:"updated_at"`
}

type Program struct {
	ID         int64       `json:"id"`
	PlatformID int64       `json:"platform_id"`
	Name       string      `json:"name"`
	Slug       string      `json:"slug"`
	Vdp        bool        `json:"vdp"`
	Favourite  bool        `json:"favourite"`
	Tag        string      `json:"tag"`
	Url        string      `json:"url"`
	Type       ProgramType `json:"type"`
	CreatedAt  time.Time   `json:"created_at"`
	UpdatedAt  time.Time   `json:"updated_at"`
}

type Reset struct {
	UserID    int64     `json:"user_id"`
	Code      string    `json:"code"`
	CreatedAt time.Time `json:"created_at"`
}

type Scan struct {
	ID        string    `json:"id"`
	Domain    string    `json:"domain"`
	Params    string    `json:"params"`
	Type      string    `json:"type"`
	Status    string    `json:"status"`
	StartTime time.Time `json:"start_time"`
	EndTime   time.Time `json:"end_time"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Output    string    `json:"output"`
}

type Scope struct {
	ID        int64     `json:"id"`
	Scope     string    `json:"scope"`
	ScopeType string    `json:"scope_type"`
	ProgramID int64     `json:"program_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Setting struct {
	ID        int64     `json:"id"`
	Key       string    `json:"key"`
	Value     string    `json:"value"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Stat struct {
	ID           int64     `json:"id"`
	ReportID     string    `json:"report_id"`
	ReportTitle  string    `json:"report_title"`
	Severity     string    `json:"severity"`
	Reward       float32   `json:"reward"`
	Currency     string    `json:"currency"`
	Collab       bool      `json:"collab"`
	ReportStatus string    `json:"report_status"`
	ReportDate   time.Time `json:"report_date"`
	PlatformID   int64     `json:"platform_id"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type Subdomain struct {
	ID            int64     `json:"id"`
	ProgramID     int64     `json:"program_id"`
	Url           string    `json:"url"`
	Title         string    `json:"title"`
	BodyHash      string    `json:"body_hash"`
	Tag           string    `json:"tag"`
	Ip            string    `json:"ip"`
	Port          string    `json:"port"`
	Screenshot    string    `json:"screenshot"`
	StatusCode    int32     `json:"status_code"`
	Technologies  string    `json:"technologies"`
	ContentLength int32     `json:"content_length"`
	Favourite     bool      `json:"favourite"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type Url struct {
	ID         int64     `json:"id"`
	Subdomain  string    `json:"subdomain"`
	Url        string    `json:"url"`
	Tag        string    `json:"tag"`
	StatusCode int32     `json:"status_code"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type User struct {
	ID        int64     `json:"id"`
	Email     string    `json:"email"`
	Pass      string    `json:"pass"`
	Salt      string    `json:"salt"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Vulnerability struct {
	ID        int64     `json:"id"`
	ProgramID int64     `json:"program_id"`
	Url       string    `json:"url"`
	Tag       string    `json:"tag"`
	Type      string    `json:"type"`
	Severity  string    `json:"severity"`
	Favourite bool      `json:"favourite"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
