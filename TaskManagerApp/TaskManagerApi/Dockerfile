FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["TaskManagerApi.csproj", "./"]
RUN dotnet restore "TaskManagerApi.csproj"
COPY . .
RUN dotnet build "TaskManagerApi.csproj" -c Release -o /app/build
RUN dotnet publish "TaskManagerApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TaskManagerApi.dll"]
