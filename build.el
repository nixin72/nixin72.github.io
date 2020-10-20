(setq website-dir "/run/media/nixin72/s/repos/website")

(setq build-root
  `("nixin72.github.io:root"
    :base-directory ,website-dir
    :publishing-directory ,(concat website-dir "/docs")
    :section-numbers nil
    :table-of-contents nil
    :recursive t
    :publishing-function org-html-publish-to-html))

(setq build-assets
  `("nixin72.github.io:assets"
    :base-directory ,(concat root-dir "/assets")
    :base-extension "css\\|el\\|js\\|jpg\\|gif\\|png"
    :publishing-directory ,(concat root-dir "/docs/assets")
    :publishing-function org-publish-attachment))

(setq org-publish-project-alist
      ;; Main website
      `(,build-root
        ,build-assets
        ("nixin72.github.io"
         :components ("nixin72.github.io:root"
                      "nixin72.github.io:assets"))))
