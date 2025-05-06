var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();
// Configurar el JSON para usar PascalCase (sin cambiar a camelCase)
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
DotNetEnv.Env.Load();
// Configure the HTTP request pipeline.
if (builder.Configuration.GetValue<bool>("EnableSwagger"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapRazorPages();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=LoginView}/{action=Index}/{id?}");

app.Run();
