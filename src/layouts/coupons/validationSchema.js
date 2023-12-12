import * as yup from "yup";

const couponSchema = yup.object().shape({
    code: yup.string().required(),
    value: yup.string().required(),
});

export default couponSchema;
