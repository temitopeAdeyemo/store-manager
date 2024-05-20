import { celebrate, Joi, Segments } from 'celebrate';

export const getManyValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    category_name: Joi.string(),
    category_code: Joi.string()
      .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
      .message('Code can only be upper case letters, underscore and numbers'),
    discount: Joi.string()
      .pattern(/^[0-9]+$/)
      .message('Discount values can only be number.'),
    created_by: Joi.string().pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
  }),
});

export const getOneValidator = celebrate({
  [Segments.QUERY]: Joi.object()
    .keys({
      category_code: Joi.string()
        .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
        .message('Code can only be upper case letters, underscore and numbers'),
      category_id: Joi.string(),
    })
    .xor('category_code', 'category_id'),
});
