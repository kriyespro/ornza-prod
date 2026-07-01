from django.templatetags.static import static
from django.urls import reverse
from django.utils.safestring import mark_safe
from jinja2 import Environment


def url(viewname, *args, **kwargs):
    return reverse(viewname, args=args if args else None, kwargs=kwargs if kwargs else None)


def environment(**options):
    options.pop('context_processors', None)
    env = Environment(**options)
    env.globals.update({
        'static': static,
        'url': url,
        'mark_safe': mark_safe,
        'enumerate': enumerate,
        'range': range,
        'len': len,
        'str': str,
        'int': int,
        'zip': zip,
        'dict': dict,
        'list': list,
        'min': min,
        'max': max,
        'abs': abs,
    })
    return env
