import ldap
from decouple import config
from django_auth_ldap.config import LDAPSearch

# ───────────────────────────── Server & reader
AUTH_LDAP_SERVER_URI    = config("DJANGO_CTL_LDAP_SERVER_URI")
AUTH_LDAP_BIND_DN       = config("DJANGO_CTL_LDAP_BIND_DN")
AUTH_LDAP_BIND_PASSWORD = config("DJANGO_CTL_LDAP_BIND_PASS")

# ───────────────────────────── Búsqueda del usuario (login corto)
AUTH_LDAP_USER_SEARCH = LDAPSearch(
    config("DJANGO_CTL_LDAP_SEARCH_BASE"),
    ldap.SCOPE_SUBTREE,                    # type: ignore[attr-defined]
    "(sAMAccountName=%(user)s)"
)

# ───────── (Si prefieres UPN directo, comenta lo de arriba y usa:)
# AUTH_LDAP_USER_DN_TEMPLATE = "%(user)s"   # wbenitez@insssep.gov.ar

# ───────────────────────────── Opciones de conexión (AD)
AUTH_LDAP_CONNECTION_OPTIONS = {
    ldap.OPT_REFERRALS: 0,            # type: ignore[attr-defined]
    ldap.OPT_PROTOCOL_VERSION: 3,     # type: ignore[attr-defined]
}

from django_auth_ldap.config import LDAPSearch, GroupOfNamesType
#Añade búsqueda y tipo de grupo
AUTH_LDAP_GROUP_SEARCH = LDAPSearch(
    "OU=Grupos,DC=insssep,DC=gov,DC=ar", 
    ldap.SCOPE_SUBTREE,  # type: ignore[attr-defined]
    "(objectClass=group)"
)
AUTH_LDAP_GROUP_TYPE = GroupOfNamesType()   # estándar AD (member=DN)


# Si pruebas LDAPS con cert autofirmado (solo testing):
# ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)
# AUTH_LDAP_SERVER_URI = "ldaps://insssep.gov.ar:636"

# ───────────────────────────── Mapeo de atributos
AUTH_LDAP_USER_ATTR_MAP = {
    "first_name": "givenName",
    "last_name":  "sn",
    "email":      "mail",
}

AUTH_LDAP_CREATE_USERS       = True      # crea usuario local en 1er login
AUTH_LDAP_ALWAYS_UPDATE_USER = True      # refresca datos en cada login
AUTH_LDAP_CACHE_TIMEOUT      = 3600      # cachea búsquedas 1 h

# ───────────────────────────── (Opcional) Grupos → flags
# from django_auth_ldap.config import LDAPSearch, GroupOfNamesType
# AUTH_LDAP_GROUP_SEARCH = LDAPSearch(
#     "OU=Grupos,DC=insssep,DC=gov,DC=ar", ldap.SCOPE_SUBTREE, "(objectClass=group)"
# )
# AUTH_LDAP_GROUP_TYPE = GroupOfNamesType()
# AUTH_LDAP_USER_FLAGS_BY_GROUP = {
#     "is_staff":     "CN=Staff,OU=Grupos,DC=insssep,DC=gov,DC=ar",
#     "is_superuser": "CN=Admins,OU=Grupos,DC=insssep,DC=gov,DC=ar",
# }
