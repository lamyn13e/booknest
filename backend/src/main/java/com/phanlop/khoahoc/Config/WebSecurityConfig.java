package com.phanlop.khoahoc.Config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsServiceImpl);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // Cấu hình CORS cho React (http://localhost:8082)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:8082"));
        cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", cfg);
        return src;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Custom accessDeniedHandler trả JSON 403
        AccessDeniedHandler accessDeniedHandler = (req, res, ex) -> {
            res.setStatus(HttpStatus.FORBIDDEN.value());
            res.setContentType("application/json");
            res.getWriter().write("{\"error\":\"Bạn không có quyền truy cập\"}");
        };

        http
                .cors().and()
                .csrf(csrf -> csrf.disable())

                // 1) Phân quyền
                .authorizeHttpRequests(auth -> auth
                        // chỉ ADMIN mới được /api/users/**
                        .requestMatchers("/api/users/**").hasRole("ADMIN")
                        // public endpoints
                        .requestMatchers("/login", "/register", "/forget", "/reset", "/css/**", "/img/**", "/js/**").permitAll()
                        .anyRequest().permitAll()
                )

                // 2) exceptionHandling cho REST API
                .exceptionHandling(ex -> ex
                        // với các /api/** chưa login → 401 JSON
                        .defaultAuthenticationEntryPointFor(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                                new AntPathRequestMatcher("/api/**")
                        )
                        // với /api/** đã login nhưng thiếu quyền → 403 JSON
                        .accessDeniedHandler(accessDeniedHandler)
                )

                // 3) Form login (POST /login) trả JSON
                .formLogin(form -> form
                        .loginProcessingUrl("/login")
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .successHandler(customAuthenticationSuccessHandler)
                        .failureHandler((req, res, ex) -> {
                            res.setStatus(HttpStatus.UNAUTHORIZED.value());
                            res.setContentType("application/json");
                            res.getWriter().write("{\"error\":\"Tài khoản hoặc mật khẩu sai\"}");
                        })
                        .permitAll()
                )

                // 4) Logout trả JSON
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler((req, res, auth) -> {
                            res.setStatus(HttpStatus.OK.value());
                            res.setContentType("application/json");
                            res.getWriter().write("{\"message\":\"Đăng xuất thành công\"}");
                        })
                        .permitAll()
                );

        return http.build();
    }
}
