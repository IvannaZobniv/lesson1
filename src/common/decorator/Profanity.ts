import { registerDecorator, ValidationOptions } from 'class-validator';

export const Profanity = (validationOption?: ValidationOptions) => {
  return (object, propertyName) => {
    registerDecorator({
      name: 'noProfanity',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'The use of profanity is prohibited',
        ...validationOption,
      },
      validator: {
        validate(value: any) {
          // regex for profanity
          const regex =
            /\b(asshole|fuck(ing?)?|shit(ting?)?|bitch(es)?|damn|hell|piss(ing?)?|cunt|cock|dick|pussy|fuck|ебу|блять|блядь|блядина|хуй|сука|пизда|пизды|їбати|єбать|ахуеть|говно|гондон|долбоёб|ебало|жопа|заебись|залупа|нахуй|охееть)\b/i;
          return typeof value === 'string' && !regex.test(value);
        },
      },
    });
  };
};
