import React from "react";
import PropTypes from "prop-types";

export const FormWrapper = ({
    title,
    subtitle,
    logoSrc,
    logoAlt = "ANDA",
    onSubmit,
    isSubmitting = false,
    submitText = "Continuar",
    maxWidth = "420px",
    children,
    footer,
    className = ""
}) => {
    const cardStyle = { maxWidth };
    const cardClassName = `form-card ${className}`.trim();

    return (
        <div className="form-container">
            <div className={cardClassName} style={cardStyle}>
                <div className="form-header">
                    {logoSrc && <img src={logoSrc} alt={logoAlt} />}
                    {title && <h5>{title}</h5>}
                    {subtitle && <p>{subtitle}</p>}
                </div>

                {onSubmit ? (
                    <form onSubmit={onSubmit} noValidate>
                        <div className="form-body">{children}</div>
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Cargando..." : submitText}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="form-body">{children}</div>
                )}

                {footer ? <div className="form-footer">{footer}</div> : null}
            </div>
        </div>
    );
};

FormWrapper.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    logoSrc: PropTypes.string,
    logoAlt: PropTypes.string,
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    submitText: PropTypes.string,
    maxWidth: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
    className: PropTypes.string
};
