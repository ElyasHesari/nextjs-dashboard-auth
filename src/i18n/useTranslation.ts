import { translations, Translations } from './translations';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];

type TranslationPath = NestedKeyOf<Translations>;

export const useTranslation = () => {
  const t = (key: TranslationPath, params?: Record<string, string | number>): string => {
    const keys = key.split('.') as Array<keyof Translations>;
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" is not a string`);
      return key;
    }

    // Replace placeholders like {username} with actual values
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  return { t };
};

// Utility function for non-React contexts (services, utilities, etc.)
export const getTranslation = (key: TranslationPath, params?: Record<string, string | number>): string => {
  const keys = key.split('.') as Array<keyof Translations>;
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
  }

  if (typeof value !== 'string') {
    console.warn(`Translation key "${key}" is not a string`);
    return key;
  }

  // Replace placeholders like {username} with actual values
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }

  return value;
};

