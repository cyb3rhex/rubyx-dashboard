package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/aituglo/rubyx/golang/db"
	"github.com/aituglo/rubyx/golang/env"
	"github.com/aituglo/rubyx/golang/errors"
	"github.com/aituglo/rubyx/golang/server/write"
)

type SetRepoParams struct {
	RepoUrl string `json:"url"`
}

func isDirEmpty(name string) (bool, error) {
	f, err := os.Open(name)
	if err != nil {
		return false, err
	}
	defer f.Close()

	_, err = f.Readdir(1)
	if err == nil {
		return false, nil
	}
	if err == io.EOF {
		return true, nil
	}
	return false, err
}

func SetRepoDataUrl(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	decoder := json.NewDecoder(r.Body)
	p := &SetRepoParams{}
	err := decoder.Decode(p)
	if err != nil || p == nil {
		return write.Error(errors.NoJSONBody)
	}

	_, err = env.DB().GetSettingByKey(r.Context(), "repo_data_url")
	if err != nil {
		return write.JSONorErr(env.DB().AddSetting(r.Context(), db.AddSettingParams{
			Key:   "repo_data_url",
			Value: p.RepoUrl,
		}))
	}

	return write.JSONorErr(env.DB().UpdateSetting(r.Context(), db.UpdateSettingParams{
		Key:   "repo_data_url",
		Value: p.RepoUrl,
	}))
}

func GetRepoDataUrl(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	url, err := env.DB().GetSettingByKey(r.Context(), "repo_data_url")
	if err != nil {
		if isNotFound(err) {
			return write.Error(errors.ItemNotFound)
		}
		return write.Error(err)
	}

	return write.JSON(url)
}

func PullRubyxData(env env.Env, user *db.User, w http.ResponseWriter, r *http.Request) http.HandlerFunc {
	if user == nil {
		return write.Error(errors.RouteUnauthorized)
	}

	var url string
	query, err := env.DB().GetSettingByKey(r.Context(), "repo_data_url")
	if err != nil {
		url = "https://github.com/aituglo/rubyx-data"
	} else {
		url = query.Value
	}

	dirPath := "/rubyx-data/"
	fileInfo, err := os.Stat(dirPath)
	if err != nil {
		log.Println(err)
		return write.Error(err)
	}
	if !fileInfo.IsDir() {
		log.Printf("%s is not a valid folder\n", dirPath)
		return write.JSON("error")
	}
	empty, err := isDirEmpty(dirPath)
	if err != nil {
		log.Println(err)
		return write.Error(err)
	}

	// Clonage ou mise à jour du dépôt en fonction de l'état de /rubyx-data/
	if empty {
		cloneCmd := exec.Command("git", "clone", url, dirPath)
		err = cloneCmd.Run()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		fmt.Printf("Clone success of %s in %s\n", url, dirPath)
	} else {
		pullCmd := exec.Command("git", "-C", dirPath, "pull")
		err = pullCmd.Run()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		fmt.Printf("Rubyx Data Pull Success %s\n", dirPath)
	}

	return write.JSON("success")
}
