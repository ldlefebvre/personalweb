# Personal portfolio — Laurent Lefebvre

Rails site for my professional portfolio: background, project showcases (EXAD, Nouri, and others), and a contact form.

**Live:** [laurentlefebvre.me](https://www.laurentlefebvre.me)

## Stack

- Ruby **3.1.2**, Rails **~> 7.1**
- PostgreSQL, Puma
- Hotwire (Turbo, Stimulus), import maps, Sprockets asset pipeline
- SCSS, Font Awesome

## Pages

| Path        | Purpose                          |
| ----------- | -------------------------------- |
| `/`         | Home                             |
| `/aboutme`  | About / experience             |
| `/project`  | Projects and detail sections   |
| `/contact`  | Contact form (posts to mailer) |

## Local setup

```bash
bin/setup
bin/rails server
```

`bin/setup` installs gems and prepares the database; run `bundle install` and `bin/rails db:prepare` yourself if you prefer not to use it.

## Deploy (Heroku)

After committing changes:

```bash
git push heroku master
```

Use `main` instead of `master` if that is your default branch.
