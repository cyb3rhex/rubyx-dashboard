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

type PostStatus string

const (
	PostStatusDraft     PostStatus = "draft"
	PostStatusPublished PostStatus = "published"
)

func (e *PostStatus) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = PostStatus(s)
	case string:
		*e = PostStatus(s)
	default:
		return fmt.Errorf("unsupported scan type for PostStatus: %T", src)
	}
	return nil
}

type NullPostStatus struct {
	PostStatus PostStatus
	Valid      bool // Valid is true if String is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullPostStatus) Scan(value interface{}) error {
	if value == nil {
		ns.PostStatus, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.PostStatus.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullPostStatus) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return ns.PostStatus, nil
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

type UserStatus string

const (
	UserStatusDisabled   UserStatus = "disabled"
	UserStatusUnverified UserStatus = "unverified"
	UserStatusActive     UserStatus = "active"
)

func (e *UserStatus) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = UserStatus(s)
	case string:
		*e = UserStatus(s)
	default:
		return fmt.Errorf("unsupported scan type for UserStatus: %T", src)
	}
	return nil
}

type NullUserStatus struct {
	UserStatus UserStatus
	Valid      bool // Valid is true if String is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullUserStatus) Scan(value interface{}) error {
	if value == nil {
		ns.UserStatus, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.UserStatus.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullUserStatus) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return ns.UserStatus, nil
}

type Api struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	ApiKey    string    `json:"api_key"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Ip struct {
	ID          int64     `json:"id"`
	ProgramID   int64     `json:"program_id"`
	SubdomainID int64     `json:"subdomain_id"`
	Ip          string    `json:"ip"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Platform struct {
	ID        int64        `json:"id"`
	Name      string       `json:"name"`
	Slug      string       `json:"slug"`
	Url       string       `json:"url"`
	Type      PlatformType `json:"type"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
}

type Port struct {
	ID        int64     `json:"id"`
	IpID      int64     `json:"ip_id"`
	Port      int32     `json:"port"`
	Service   string    `json:"service"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Post struct {
	ID        int64      `json:"id"`
	AuthorID  int64      `json:"author_id"`
	Title     string     `json:"title"`
	Body      string     `json:"body"`
	Status    PostStatus `json:"status"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

type Program struct {
	ID         int64       `json:"id"`
	PlatformID int64       `json:"platform_id"`
	Name       string      `json:"name"`
	Slug       string      `json:"slug"`
	Vdp        bool        `json:"vdp"`
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

type Revenue struct {
	ID              int64     `json:"id"`
	ProgramID       int64     `json:"program_id"`
	VulnerabilityID int64     `json:"vulnerability_id"`
	Money           int32     `json:"money"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

type Rootdomain struct {
	ID        int64     `json:"id"`
	ProgramID int64     `json:"program_id"`
	Url       string    `json:"url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Subdomain struct {
	ID            int64     `json:"id"`
	ProgramID     int64     `json:"program_id"`
	Url           string    `json:"url"`
	Title         string    `json:"title"`
	BodyHash      string    `json:"body_hash"`
	StatusCode    int32     `json:"status_code"`
	Technologies  string    `json:"technologies"`
	ContentLength int32     `json:"content_length"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type Url struct {
	ID            int64     `json:"id"`
	SubdomainID   int64     `json:"subdomain_id"`
	Url           string    `json:"url"`
	Title         string    `json:"title"`
	BodyHash      string    `json:"body_hash"`
	StatusCode    int32     `json:"status_code"`
	Technologies  string    `json:"technologies"`
	ContentLength int32     `json:"content_length"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type User struct {
	ID           int64      `json:"id"`
	Email        string     `json:"email"`
	Pass         string     `json:"pass"`
	Salt         string     `json:"salt"`
	Status       UserStatus `json:"status"`
	Verification string     `json:"verification"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

type Vulnerability struct {
	ID        int64     `json:"id"`
	ProgramID int64     `json:"program_id"`
	Url       string    `json:"url"`
	Type      string    `json:"type"`
	Severity  string    `json:"severity"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
