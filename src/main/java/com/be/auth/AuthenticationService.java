package com.be.auth;

import com.be.address.AddressEntity;
import com.be.address.AddressRepository;
import com.be.building.BuildingEntity;
import com.be.building.BuildingRepository;
import com.be.config.JwtService;
import com.be.dto.request.CustomerRegisterRequest;
import com.be.dto.request.EmployeeRegisterRequest;
import com.be.dto.response.CustomerLoginResponse;
import com.be.dto.response.LoginResponse;
import com.be.room.RoomEntity;
import com.be.room.RoomRepository;
import com.be.service.ServiceEntity;
import com.be.service.ServiceRepository;
import com.be.token.Token;
import com.be.token.TokenRepository;
import com.be.token.TokenType;
import com.be.user.Role;
import com.be.user.UserEntity;
import com.be.user.UserRepository;
import com.be.work.WorkEntity;
import com.be.work.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AddressRepository addressRepository;
    private final TokenRepository tokenRepository;
    private final WorkRepository workRepository;

    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;
    private final ServiceRepository serviceRepository;

    public AuthenticationResponse register(CustomerRegisterRequest request) {
        String email = request.getEmail();
        UserEntity userExist = repository.findByEmail(email).orElse(null);
        if (userExist != null) {
            return null;
        }
        var user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER)
                .status(true)
                .build();
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        UserEntity userOptional = repository.findByEmail(user.getEmail()).orElse(null);
        BuildingEntity buildingEntity = buildingRepository.findById(request.getBuildingId()).orElse(null);
        RoomEntity roomEntity = roomRepository.findById(request.getRoomId()).orElse(null);
        AddressEntity address = new AddressEntity(userOptional, buildingEntity, roomEntity);
        addressRepository.save(address);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }


    public boolean createEmployee(EmployeeRegisterRequest request) {
        Optional<UserEntity> userExist = repository.findByEmail(request.getEmail());
        if (userExist.isEmpty()) {
            var user = UserEntity.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .phone(request.getPhone())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.EMPLOYEE)
                    .status(true)
                    .build();
            var savedUser = repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            saveUserToken(savedUser, jwtToken);
            UserEntity userSaved = repository.findByEmail(request.getEmail()).orElseThrow();
            ServiceEntity service = serviceRepository.findById(request.getServiceId()).orElse(null);
            WorkEntity workEntity = new WorkEntity();
            workEntity.setEmployeeInfo(userSaved);
            workEntity.setService(service);
            workRepository.save(workEntity);
            return true;
        } else {
            return false;
        }
    }


    public LoginResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        if (!user.isStatus()) {
            return null;
        }
        var jwtToken = tokenRepository.findAllValidTokensByUser(user.getId()).getToken();
        AuthenticationResponse jwt = AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
        LoginResponse loginResponse = new LoginResponse();
        CustomerLoginResponse response = new CustomerLoginResponse(user.getId(), user.getName(), user.getRole().toString(), user.getPhone());
        loginResponse.setUser(response);
        loginResponse.setJwtToken(jwt.getAccessToken());
        return loginResponse;
    }

    public void saveUserToken(UserEntity user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }


}